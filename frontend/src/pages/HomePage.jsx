import React from "react";
import Banner from "../components/Banner";
import ProductListPage from "./ProductListPage";

export default function HomePage() {
  return (
    <div>
      
      <Banner />

      <div className="container mx-auto px-6 py-8">
        <h2 className="text-2xl font-bold mb-6">Featured Products</h2>
        <ProductListPage />
      </div>
    </div>
  );
}
