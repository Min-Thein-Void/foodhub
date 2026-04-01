"use client";

import Link from "next/link";
import { useCartStore } from "@/store/useCartStore";
import toast, { Toaster } from "react-hot-toast";

interface MenuDetailProps {
  menu: {
    id: number;
    name: string;
    description: string;
    price: number;
    image: string;
  };
}

function MenuDetail({ menu }: MenuDetailProps) {
  const addToCart = useCartStore((state) => state.addToCart);

  const handleAddToCart = () => {
    addToCart({
      id: menu.id,
      name: menu.name,
      price: menu.price,
      image: menu.image,
    });

    // Show toast notification
    toast.success(`${menu.name} added to cart!`,{
  style: {
    border: '1px solid #713200',
    padding: '16px',
    color: '#713200',
  },
  iconTheme: {
    primary: '#713200',
    secondary: '#FFFAEE',
  },
});
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-10">
      {/* Toast container */}
      <Toaster position="top-center" reverseOrder={false} />

      <div className="max-w-7xl w-full grid md:grid-cols-2 bg-white shadow-xl rounded-2xl overflow-hidden relative">
        {/* Close Button */}
        <Link
          href="/menus"
          className="absolute top-5 right-5 z-10 backdrop-blur p-2 rounded-full transition"
        >
          ✕
        </Link>

        {/* IMAGE */}
        <div className="w-full h-110 md:h-full">
          <img
            src={menu.image}
            alt={menu.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* CONTENT */}
        <div className="p-8 md:p-12 flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-4">{menu.name}</h1>
            <p className="text-gray-600">{menu.description}</p>
          </div>

          <div className="mt-8 flex items-center justify-between">
            <span className="text-3xl font-bold text-orange-600">
              ${menu.price.toFixed(2)}
            </span>

            <button
              onClick={handleAddToCart}
              className="bg-orange-600 text-white px-5 py-3 rounded-full hover:bg-orange-700 transition"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MenuDetail;
