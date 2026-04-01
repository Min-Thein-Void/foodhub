"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/store/useCartStore";
import toast, { Toaster } from "react-hot-toast";

type MenuItemCardProps = {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
};

const MenuItemCard: React.FC<MenuItemCardProps> = ({
  id,
  name,
  description,
  price,
  image,
}) => {
  const addToCart = useCartStore((state) => state.addToCart);

  const handleAddToCart = () => {
    addToCart({ id, name, price, image });
    toast.success(`${name} added to basket`, {
      style: {
        border: "1px solid #713200",
        padding: "16px",
        color: "#713200",
      },
      iconTheme: {
        primary: "#713200",
        secondary: "#FFFAEE",
      },
    });
  };

  return (
    <div className="w-47 sm:w-64 md:w-72 border-2 border-amber-300 bg-white rounded-2xl hover:shadow-md transition duration-300 overflow-hidden">
      <Toaster position="top-center" reverseOrder={false} />
      {/* Image */}
      <div className="relative w-full h-32 sm:h-40 md:h-56 bg-gray-50">
        <Link href={`/menu/${id}`}>
          <Image src={image} alt={name} fill className="object-contain p-2 transition-transform duration-500 ease-in hover:rotate-360" />
        </Link>
      </div>

      {/* Content */}
      <div className="p-3 sm:p-4">
        <h3 className="text-sm sm:text-base font-semibold text-brown-700 line-clamp-1">
          {name}
        </h3>

        <p className="text-xs sm:text-sm text-brown-500 mt-1 line-clamp-2">
          {description}
        </p>

        {/* Bottom row */}
        <div className="mt-3 sm:mt-4 flex items-center justify-between">
          <span className="text-orange-600 font-semibold text-sm sm:text-lg">
            ${price.toFixed(2)}
          </span>

          <button
            onClick={handleAddToCart}
            className="bg-orange-500 text-white p-2 rounded-full hover:bg-orange-600 transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 7h18l-2 12H5L3 7z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 7V5a3 3 0 016 0v2"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MenuItemCard;
