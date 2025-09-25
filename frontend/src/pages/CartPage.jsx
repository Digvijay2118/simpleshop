import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import FormInput from "../components/FormInput";
import { placeOrder } from "../api";

export default function CartPage() {
  const { items, remove, setQty, clear } = useCart();
  const [form, setForm] = useState({ firstName: "", lastName: "", address: "" });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const total = items.reduce((s, i) => s + i.price * i.qty, 0);

  function onChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handlePlaceOrder() {
    setMessage(null);
    if (!form.firstName || !form.lastName || !form.address) {
      setMessage({ type: "error", text: "Please fill all required fields" });
      return;
    }
    if (items.length === 0) {
      setMessage({ type: "error", text: "Cart is empty" });
      return;
    }

    try {
      setLoading(true);
      const payload = { ...form, items, total };
      const res = await placeOrder(payload);
      setMessage({ type: "success", text: res.message });
      clear();
      setForm({ firstName: "", lastName: "", address: "" });
    } catch (err) {
      setMessage({ type: "error", text: err.message || "Order failed" });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid md:grid-cols-3 gap-6">
      {/* Cart Items */}
      <div className="md:col-span-2 bg-white p-6 rounded-xl shadow">
        <h2 className="text-2xl font-semibold mb-4">Your Cart</h2>
        {items.length === 0 ? (
          <p className="text-gray-600">Your cart is empty.</p>
        ) : (
          items.map((i) => (
            <div
              key={i.id}
              className="flex items-center justify-between border-b py-4"
            >
              <div className="flex items-center gap-4">
                <img
                  src={i.image}
                  alt={i.name}
                  className="w-20 h-16 rounded object-cover"
                />
                <div>
                  <p className="font-medium">{i.name}</p>
                  <p className="text-sm text-gray-600">₹{i.price}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="number"
                  min="1"
                  value={i.qty}
                  onChange={(e) => setQty(i.id, Number(e.target.value))}
                  className="w-16 border rounded px-2 py-1"
                />
                <button
                  onClick={() => remove(i.id)}
                  className="text-red-600 hover:text-red-800 text-sm"
                >
                  Remove
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Summary + Form */}
      <aside className="bg-white p-6 rounded-xl shadow">
        <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
        <p className="mb-4 text-gray-700">
          Total: <span className="font-bold">₹{total}</span>
        </p>

        <FormInput
          label="First Name"
          name="firstName"
          value={form.firstName}
          onChange={onChange}
          required
        />
        <FormInput
          label="Last Name"
          name="lastName"
          value={form.lastName}
          onChange={onChange}
          required
        />
        <FormInput
          label="Address"
          name="address"
          value={form.address}
          onChange={onChange}
          required
        />

        {message && (
          <div
            className={`mt-4 p-3 rounded text-sm ${
              message.type === "error"
                ? "bg-red-100 text-red-700"
                : "bg-green-100 text-green-700"
            }`}
          >
            {message.text}
          </div>
        )}

        <button
          onClick={handlePlaceOrder}
          disabled={loading}
          className="mt-5 w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition"
        >
          {loading ? "Placing..." : "Place Order"}
        </button>
      </aside>
    </div>
  );
}
