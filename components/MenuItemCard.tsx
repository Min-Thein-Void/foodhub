"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/store/useCartStore";
import toast from "react-hot-toast";

type MenuItemCardProps = {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: {
    name: string;
  };
};

const MenuItemCard: React.FC<MenuItemCardProps> = ({
  id,
  name,
  description,
  price,
  image,
  category,
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
    <article className="group overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-slate-700 dark:bg-slate-950">
      <div className="relative h-52 overflow-hidden bg-slate-100">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover transition duration-500 group-hover:scale-105"
        />

        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/90 to-transparent px-4 pb-4 pt-10">
          <span className="inline-flex rounded-full bg-orange-50 px-3 py-1 text-xs font-semibold text-orange-600 shadow-sm dark:bg-orange-500/15 dark:text-orange-200">
            {category.name}
          </span>
        </div>
      </div>

      <div className="p-4 sm:p-5">
        <div className="space-y-4">
          <div>
            <h3 className="text-base font-semibold text-slate-900 dark:text-white line-clamp-1">
              {name}
            </h3>
            <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400 line-clamp-2">
              {description}
            </p>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-slate-400 dark:text-slate-500">
                Starting at
              </p>
              <p className="text-xl font-semibold text-orange-600 dark:text-orange-300">
                ${price.toFixed(2)}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Link
                href={`/menu/${id}`}
                className="text-sm font-medium text-orange-600 transition hover:text-orange-700 dark:text-orange-300"
              >
                View details
              </Link>
              <button
                type="button"
                onClick={handleAddToCart}
                className="inline-flex h-11 items-center justify-center rounded-full bg-orange-500 px-4 text-sm font-semibold text-white transition hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-300 dark:focus:ring-orange-500/40"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default MenuItemCard;
