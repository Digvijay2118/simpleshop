import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { ToastContainer } from "react-toastify";
import AppRoutes from "./routes/routes";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-6">
        <AppRoutes />
      </main>
      <Footer />
      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
}
