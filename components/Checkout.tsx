"use client";

import { useCartStore } from "@/store/useCartStore";
import { useState, ChangeEvent, FormEvent } from "react";

type FormData = {
  name: string;
  phone: string;
  address: string;
};

function Checkout() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    phone: "",
    address: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const cart = useCartStore((state) => state.cart);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const order = {
      ...formData,
      items: cart,
      total: cart.reduce((acc, item) => acc + item.price * item.qty, 0),
    };

    const res = await fetch("/api/order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(order),
    });

    if (!res.ok) {
      const text = await res.text();
      console.error("API error:", text); 
      alert("Failed to place order");
      return;
    }

    const data = await res.json();
    console.log("Order placed:", data);
  };

  return (
    <div className="w-full bg-white shadow-lg rounded-2xl p-6 border border-orange-100">
      <h2 className="text-xl font-semibold text-orange-600 mb-5">
        Checkout Details
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="text-sm text-gray-600">Customer Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-400"
            required
          />
        </div>

        <div>
          <label className="text-sm text-gray-600">Phone Number</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-400"
            required
          />
        </div>

        <div>
          <label className="text-sm text-gray-600">Shipping Address</label>
          <textarea
            name="address"
            rows={3}
            value={formData.address}
            onChange={handleChange}
            className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-400"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg mt-2"
        >
          Place Order
        </button>
      </form>
    </div>
  );
}

export default Checkout;
