import { useState } from "react";
import { useCart } from "../context/CartContext";
import { placeOrder } from "../api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import ConfirmModal from "../components/ConfirmModal";

export default function CartPage() {
  const { items, remove, setQty, clear } = useCart();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    address: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [confirmModal, setConfirmModal] = useState({
    open: false,
    productId: null,
    productName: "",
  });

  const total = items.reduce((s, i) => s + i.price * i.qty, 0);

  function onChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handlePlaceOrder() {
    if (!form.firstName || !form.lastName || !form.address) {
      toast.error("Please fill all required fields");
      return;
    }
    if (items.length === 0) {
      toast.error("Cart is empty");
      return;
    }

    try {
      setLoading(true);
      const payload = { ...form, items, total };
      const res = await placeOrder(payload);
      toast.success("Order placed successfully!");
      clear();
      setForm({ firstName: "", lastName: "", address: "" });
    } catch (err) {
      toast.error("Order failed!");
    } finally {
      setLoading(false);
    }
  }

  function openRemoveModal(id, name) {
    setConfirmModal({ open: true, productId: id, productName: name });
  }

  function confirmRemove() {
    if (confirmModal.productId) {
      remove(confirmModal.productId);
      toast.info(`${confirmModal.productName} removed from cart`);
    }
    setConfirmModal({ open: false, productId: null, productName: "" });
  }

  function cancelRemove() {
    setConfirmModal({ open: false, productId: null, productName: "" });
  }

  return (
    <div className="grid md:grid-cols-3 gap-6">
      {/* Cart Items */}
      <div className="md:col-span-2 bg-white p-6 rounded-xl shadow">
        <h2 className="text-2xl font-semibold mb-4">Your Cart</h2>

        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10 text-center">
            <p className="text-gray-600 mb-4">
              Your cart is empty. Add items to it now!
            </p>
            <button
              onClick={() => navigate("/")}
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
            >
              Shop Now
            </button>
          </div>
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
                  onClick={() => openRemoveModal(i.id, i.name)}
                  className="text-red-600 hover:text-red-800 text-sm"
                >
                  Remove
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Order Summary */}
      {items.length > 0 && (
        <aside className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
          <p className="mb-4 text-gray-700">
            Total: <span className="font-bold">₹{total}</span>
          </p>

          <input
            type="text"
            name="firstName"
            value={form.firstName}
            onChange={onChange}
            placeholder="First Name"
            className="w-full border px-3 py-2 rounded mb-3"
          />
          <input
            type="text"
            name="lastName"
            value={form.lastName}
            onChange={onChange}
            placeholder="Last Name"
            className="w-full border px-3 py-2 rounded mb-3"
          />
          <textarea
            name="address"
            value={form.address}
            onChange={onChange}
            placeholder="Address"
            rows="3"
            className="w-full border px-3 py-2 rounded mb-3 resize-none"
          ></textarea>

          <button
            onClick={handlePlaceOrder}
            disabled={loading}
            className="mt-3 w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition"
          >
            {loading ? "Placing..." : "Place Order"}
          </button>
        </aside>
      )}

      <ConfirmModal
        open={confirmModal.open}
        title="Remove Item"
        message={`Are you sure you want to remove "${confirmModal.productName}" from your cart?`}
        onCancel={cancelRemove}
        onConfirm={confirmRemove}
      />
    </div>
  );
}
