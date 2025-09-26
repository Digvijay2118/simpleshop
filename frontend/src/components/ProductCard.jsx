import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";


export default function ProductCard({ product, onAdd }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    let interval;
    if (hovering && product.images && product.images.length > 1) {
      interval = setInterval(() => {
        setCurrentIndex((prev) =>
          prev === product.images.length - 1 ? 0 : prev + 1
        );
      }, 1200);
    }
    return () => clearInterval(interval);
  }, [hovering, product.images]);

   const handleAdd = () => {
    onAdd(product);
    toast.success(`${product.name} added to cart`);
  };

  return (
    <div
      className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden flex flex-col cursor-pointer group"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => {
        setHovering(false);
        setCurrentIndex(0);
      }}
    >
      <img
        src={product.images?.[currentIndex]}
        alt={product.name}
        className="transition duration-500"
      />

      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-semibold text-lg">{product.name}</h3>

        <p className="text-gray-600 text-sm flex-1 opacity-0 max-h-0 overflow-hidden transition-all duration-300 ease-in-out group-hover:opacity-100 group-hover:max-h-20">
          {product.description}
        </p>

        <div className="mt-3 flex justify-between items-center">
          <span className="text-blue-600 font-bold text-lg">
            ₹{product.price}
          </span>
          <button
             onClick={handleAdd}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
