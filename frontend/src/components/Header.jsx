import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Header() {
  const { items } = useCart();
  const totalQty = items.reduce((s, i) => s + i.qty, 0);

  return (
    <header className="bg-blue-600 shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center px-6 py-4">
        <Link to="/" className="text-white font-bold text-xl tracking-wide">
          🛒 SimpleShop
        </Link>
        <nav>
          <Link
            to="/cart"
            className="text-white bg-blue-500 hover:bg-blue-700 px-4 py-2 rounded-lg transition"
          >
            Cart ({totalQty})
          </Link>
        </nav>
      </div>
    </header>
  );
}
