import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';


export default function Header() {
const { items } = useCart();
const totalQty = items.reduce((s, i) => s + i.qty, 0);


return (
<header className="header">
<div className="container">
<Link to="/" className="brand">SimpleShop</Link>
<nav>
<Link to="/cart" className="cart-btn">Cart ({totalQty})</Link>
</nav>
</div>
</header>
);
}