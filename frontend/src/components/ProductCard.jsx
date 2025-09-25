import React from 'react';


export default function ProductCard({ product, onAdd }) {
return (
<div className="card">
<img src={product.image} alt={product.name} />
<div className="card-body">
<h3>{product.name}</h3>
<p className="desc">{product.description}</p>
<div className="card-footer">
<strong>₹{product.price}</strong>
<button onClick={() => onAdd(product)}>Add to Cart</button>
</div>
</div>
</div>
);
}