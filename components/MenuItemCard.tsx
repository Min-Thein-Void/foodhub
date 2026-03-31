"use client"

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/store/useCartStore";

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

  const addToCart = useCartStore((state)=>state.addToCart);

  return (
     <div className="w-72 bg-white rounded-2xl shadow-sm hover:shadow-md ml-18 md:ml-0 transition duration-300 overflow-hidden border border-gray-100">
      {/* Image */}
      <div className="relative w-full h-56 bg-gray-50">
         <Link href={`/menu/${id}`}>
        <Image src={image} alt={name} fill className="object-contain p-2" />
        </Link>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="text-base font-semibold text-gray-800 line-clamp-1">
          {name}
        </h3>

        <p className="text-sm text-gray-500 mt-1 line-clamp-2">{description}</p>

        {/* Bottom row */}
        <div className="mt-4 flex items-center justify-between">
          <span className="text-orange-600 font-semibold text-lg">
            ${price.toFixed(2)}
          </span>

          <button onClick={()=>addToCart({id,name,price,image})} className="bg-orange-500 text-white p-2 rounded-full hover:bg-orange-600 transition">
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
