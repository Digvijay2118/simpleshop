import React, { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { fetchProducts } from "../api";
import ProductCard from "../components/ProductCard";
import { useCart } from "../context/CartContext";

export default function ProductListPage() {
  const fetcher = useCallback(fetchProducts, []);
  const { data: products, loading, error } = useFetch(fetcher);
  const { add } = useCart();
  const location = useLocation();
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    if (!products) return;
    const params = new URLSearchParams(location.search);
    const query = params.get("search")?.toLowerCase() || "";

    if (query) {
      setFiltered(
        products.filter(
          (p) =>
            p.name.toLowerCase().includes(query) ||
            p.description.toLowerCase().includes(query)
        )
      );
    } else {
      setFiltered(products);
    }
  }, [location.search, products]);

  if (loading) return <div className="text-center py-10">Loading products...</div>;
  if (error) return <div className="text-center text-red-600">{error}</div>;
  if (!filtered || filtered.length === 0)
    return <div className="text-center py-10">No products found.</div>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {filtered.map((product) => (
        <ProductCard key={product.id} product={product} onAdd={add} />
      ))}
    </div>
  );
}
