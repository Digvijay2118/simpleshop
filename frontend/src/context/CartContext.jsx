import React, { createContext, useContext, useReducer, useEffect } from 'react';


const CartContext = createContext();


const initial = {
items: JSON.parse(localStorage.getItem('cart_items') || '[]')
};


function reducer(state, action) {
switch (action.type) {
case 'ADD': {
const found = state.items.find(i => i.id === action.payload.id);
let items;
if (found) {
items = state.items.map(i => i.id === action.payload.id ? { ...i, qty: i.qty + 1 } : i);
} else {
items = [...state.items, { ...action.payload, qty: 1 }];
}
return { ...state, items };
}
case 'REMOVE': {
const items = state.items.filter(i => i.id !== action.payload);
return { ...state, items };
}
case 'SET_QTY': {
const items = state.items.map(i => i.id === action.payload.id ? { ...i, qty: action.payload.qty } : i).filter(i => i.qty > 0);
return { ...state, items };
}
case 'CLEAR':
return { items: [] };
default:
return state;
}
}


export function CartProvider({ children }) {
const [state, dispatch] = useReducer(reducer, initial);


useEffect(() => {
localStorage.setItem('cart_items', JSON.stringify(state.items));
}, [state.items]);


const value = {
items: state.items,
add: (product) => dispatch({ type: 'ADD', payload: product }),
remove: (id) => dispatch({ type: 'REMOVE', payload: id }),
setQty: (id, qty) => dispatch({ type: 'SET_QTY', payload: { id, qty } }),
clear: () => dispatch({ type: 'CLEAR' })
};


return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}


export const useCart = () => useContext(CartContext);