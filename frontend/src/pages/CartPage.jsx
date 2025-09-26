import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { placeOrder } from "../api";

export default function CartPage() {
  const { items, remove, setQty, clear } = useCart();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    address: "",
  });
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
                  src={Array.isArray(i.images) ? i.images[0] : i.images}
                  alt={i.name}
                  className="w-20 h-16 rounded object-cover border"
                />
                <div>
                  <p className="font-medium">{i.name}</p>
                  <p className="text-sm text-gray-600">₹{i.price}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex items-center border rounded">
                  <button
                    onClick={() => setQty(i.id, Math.max(1, i.qty - 1))}
                    className="px-3 py-1 text-lg font-bold text-gray-700 hover:bg-gray-100"
                  >
                    −
                  </button>
                  <span className="px-4 py-1 border-x">{i.qty}</span>
                  <button
                    onClick={() => setQty(i.id, i.qty + 1)}
                    className="px-3 py-1 text-lg font-bold text-gray-700 hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>

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

      <aside className="bg-white p-6 rounded-xl shadow">
        <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
        <p className="mb-4 text-gray-700">
          Total: <span className="font-bold">₹{total}</span>
        </p>

        <div className="mb-4">
          <label
            htmlFor="firstName"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={form.firstName}
            onChange={onChange}
            required
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="lastName"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={form.lastName}
            onChange={onChange}
            required
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="address"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Address
          </label>
          <textarea
            id="address"
            name="address"
            value={form.address}
            onChange={onChange}
            required
            rows="3"
            className="w-full border border-gray-300 rounded-md px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          ></textarea>
        </div>

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
