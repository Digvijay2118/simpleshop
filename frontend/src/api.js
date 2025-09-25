const API_BASE =  'http://localhost:5000';


export async function fetchProducts() {
const res = await fetch(`${API_BASE}/api/products`);
if (!res.ok) throw new Error('Failed fetching products');
const body = await res.json();
return body.data;
}


export async function placeOrder(payload) {
const res = await fetch(`${API_BASE}/api/orders`, {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify(payload)
});
const body = await res.json();
if (!res.ok) throw new Error(body.message || 'Order failed');
return body;
}