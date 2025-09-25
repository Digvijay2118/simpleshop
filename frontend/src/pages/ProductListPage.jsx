import React, { useCallback } from "react";
import useFetch from "../hooks/useFetch";
import { fetchProducts } from "../api";
import ProductCard from "../components/ProductCard";
import { useCart } from "../context/CartContext";

export default function ProductListPage() {
  const fetcher = useCallback(fetchProducts, []);
  const { data: products, loading, error } = useFetch(fetcher);
  const { add } = useCart();

  if (loading) return <div className="text-center py-10">Loading products...</div>;
  if (error) return <div className="text-center text-red-600">{error}</div>;
  if (!products || products.length === 0)
    return <div className="text-center py-10">No products found.</div>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} onAdd={add} />
      ))}
    </div>
  );
}
