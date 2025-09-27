import React from "react";
import { useNavigate } from "react-router-dom";

export default function ThankYouPage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
      <h1 className="text-3xl font-bold text-green-600 mb-4">
        🎉 Thank You for Your Order!
      </h1>
      <p className="text-gray-700 mb-6 max-w-md">
        Your order has been placed successfully. We’ll notify you once it’s on
        the way.
      </p>

      <div className="flex gap-4">
        <button
          onClick={() => navigate("/")}
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition cursor-pointer"
        >
          🛍️ Shop More
        </button>
        <button
          onClick={() => navigate("/cart")}
          className="bg-gray-200 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-300 transition cursor-pointer"
        >
          View Cart
        </button>
      </div>
    </div>
  );
}
