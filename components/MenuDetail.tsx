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
    category: {
      name: string;
    };
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

    toast.success(`${menu.name} added to cart!`, {
      style: {
        border: "1px solid #F97316",
        padding: "16px",
        color: "#9A3412",
      },
      iconTheme: {
        primary: "#F97316",
        secondary: "#FFFAEE",
      },
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10 dark:bg-slate-950">
      <Toaster position="top-center" reverseOrder={false} />

      <div className="mx-auto max-w-6xl px-4">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-orange-500 dark:text-orange-300">
              Menu detail
            </p>
            <h1 className="mt-3 text-3xl font-semibold text-slate-900 dark:text-white">
              Unlock your next favorite meal.
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600 dark:text-slate-400">
              Explore the full dish details, learn why it shines, and add it to your order with one tap.
            </p>
          </div>

          <Link
            href="/menus"
            className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-medium text-slate-700 transition hover:border-orange-400 hover:text-orange-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
          >
            Back to menu
          </Link>
        </div>

        <div className="mt-10 grid gap-8 overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-[0_25px_60px_-40px_rgba(15,23,42,0.3)] dark:border-white/10 dark:bg-slate-900">
          <div className="relative min-h-[420px] overflow-hidden bg-slate-100 dark:bg-slate-800 md:min-h-[560px]">
            <img src={menu.image} alt={menu.name} className="h-full w-full object-cover" />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/90 to-transparent p-6">
              <span className="inline-flex rounded-full bg-orange-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-orange-600 dark:bg-orange-500/15 dark:text-orange-200">
                {menu.category.name}
              </span>
              <h2 className="mt-4 text-2xl font-semibold text-white">{menu.name}</h2>
            </div>
          </div>

          <div className="p-8 md:p-12">
            <div className="flex flex-col gap-6">
              <div className="space-y-4">
                <div className="inline-flex rounded-full bg-orange-100 px-4 py-2 text-sm font-semibold text-orange-700 dark:bg-orange-500/15 dark:text-orange-300">
                  Chef's recommendation
                </div>
                <p className="text-base leading-7 text-slate-700 dark:text-slate-300">
                  {menu.description}
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-[1.5rem] bg-slate-50 p-5 ring-1 ring-slate-200 dark:bg-slate-950 dark:ring-white/10">
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">Delivery estimate</p>
                  <p className="mt-3 text-lg font-semibold text-slate-900 dark:text-white">30-40 mins</p>
                </div>
                <div className="rounded-[1.5rem] bg-slate-50 p-5 ring-1 ring-slate-200 dark:bg-slate-950 dark:ring-white/10">
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">Calories</p>
                  <p className="mt-3 text-lg font-semibold text-slate-900 dark:text-white">450 kcal</p>
                </div>
              </div>

              <div className="rounded-[1.75rem] bg-slate-50 p-6 ring-1 ring-slate-200 dark:bg-slate-950 dark:ring-white/10">
                <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-orange-500 dark:text-orange-300">
                  What makes this dish special
                </h3>
                <ul className="mt-5 space-y-4 text-sm text-slate-600 dark:text-slate-300">
                  <li className="flex gap-3">
                    <span className="mt-1 inline-flex h-2.5 w-2.5 rounded-full bg-orange-500" />
                    Premium ingredients cooked to order.
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-1 inline-flex h-2.5 w-2.5 rounded-full bg-orange-500" />
                    Balanced flavors with fresh herbs and spices.
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-1 inline-flex h-2.5 w-2.5 rounded-full bg-orange-500" />
                    Designed for sharing or a satisfying solo meal.
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">Price</p>
                <p className="mt-2 text-4xl font-semibold text-orange-600 dark:text-orange-300">${menu.price.toFixed(2)}</p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <button
                  onClick={handleAddToCart}
                  className="inline-flex h-12 items-center justify-center rounded-full bg-orange-600 px-6 text-sm font-semibold text-white transition hover:bg-orange-700"
                >
                  Add to cart
                </button>
                <Link
                  href="/checkout"
                  className="inline-flex h-12 items-center justify-center rounded-full border border-slate-200 bg-white px-6 text-sm font-semibold text-slate-900 transition hover:border-orange-400 hover:text-orange-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                >
                  Checkout now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-3">
        <div className="rounded-[1.75rem] bg-white p-6 ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-white/10">
          <p className="text-sm uppercase tracking-[0.3em] text-orange-500 dark:text-orange-300">Ingredients</p>
          <ul className="mt-5 space-y-3 text-sm text-slate-700 dark:text-slate-300">
            <li>Fresh mozzarella cheese</li>
            <li>Savory tomato sauce</li>
            <li>Hand-stretched crust</li>
            <li>Italian herbs and olive oil</li>
          </ul>
        </div>

        <div className="rounded-[1.75rem] bg-white p-6 ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-white/10">
          <p className="text-sm uppercase tracking-[0.3em] text-orange-500 dark:text-orange-300">Chef’s note</p>
          <p className="mt-4 text-sm leading-6 text-slate-600 dark:text-slate-300">
            Our chefs recommend pairing this dish with a fresh salad and iced tea for a balanced meal that feels both indulgent and light.
          </p>
        </div>

        <div className="rounded-[1.75rem] bg-white p-6 ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-white/10">
          <p className="text-sm uppercase tracking-[0.3em] text-orange-500 dark:text-orange-300">Customer feedback</p>
          <div className="mt-5 space-y-4 text-sm text-slate-700 dark:text-slate-300">
            <p>“A delicious meal with bold flavor—exactly what I wanted.”</p>
            <p>“Quick delivery and the pizza was still hot when it arrived.”</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MenuDetail;
