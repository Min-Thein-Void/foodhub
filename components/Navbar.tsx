"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useCartStore } from "@/store/useCartStore";
import { CartItem } from "@/types/cart";
import Image from "next/image";
import toast, { Toaster } from "react-hot-toast";
import ThemeToggle from "@/components/ThemeToggle";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/menus", label: "Menus" },
  { href: "/about", label: "About" },
  { href: "#contact", label: "Creator" },
];

const Navbar: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const cart: CartItem[] = useCartStore((state) => state.cart);

  const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);

  useEffect(() => {
    const fetchSession = async () => {
      const { data } = await supabase.auth.getSession();
      setUser(data.session?.user ?? null);
      setLoading(false);
    };

    fetchSession();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
        setLoading(false);
      },
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const performLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast.error("Logout failed. Please try again.");
      return;
    }

    setUser(null);
    toast.success("Logged out successfully.");
  };

  const confirmLogout = () => {
    toast((t) => (
      <div className="flex flex-col gap-3 rounded-2xl bg-white p-4 text-sm text-slate-700 dark:bg-slate-900 dark:text-slate-200 shadow-lg">
        <p>Do you want to log out of FoodHub?</p>
        <div className="flex justify-end gap-2">
          <button
            onClick={() => toast.dismiss(t.id)}
            className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm text-slate-600 hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800"
          >
            Cancel
          </button>
          <button
            onClick={async () => {
              toast.dismiss(t.id);
              await performLogout();
            }}
            className="rounded-lg bg-red-600 px-3 py-1.5 text-sm font-semibold text-white hover:bg-red-500"
          >
            Logout
          </button>
        </div>
      </div>
    ));
  };

  return (
    <header className="bg-white shadow-sm dark:bg-slate-900">
      <Toaster position="top-center" />
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <div className="relative h-12 w-12 overflow-hidden rounded-2xl bg-orange-100 dark:bg-orange-500/20">
            <Image src="/foodlogo.png" alt="FoodHub logo" fill className="object-contain" />
          </div>
          <div>
            <p className="text-lg font-semibold text-orange-600 dark:text-orange-300">FoodHub</p>
            <p className="text-xs uppercase tracking-[0.25em] text-slate-400 dark:text-slate-500">Fresh meals, fast delivery</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-slate-600 transition hover:text-orange-600 dark:text-slate-200"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden md:flex">
            <ThemeToggle />
          </div>

          <Link
            href="/checkout"
            className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-3 py-2 text-sm font-semibold text-orange-700 transition hover:bg-orange-100 dark:border-slate-700 dark:bg-orange-500/10 dark:text-orange-200"
          >
            <span className="text-base">🧺</span>
            <span className="hidden sm:inline">Cart</span>
            <span className="rounded-full bg-orange-500 px-2 py-0.5 text-xs text-white">{totalQty}</span>
          </Link>

          {!loading && user ? (
            <div className="hidden items-center gap-2 md:flex">
              <span className="max-w-xs truncate rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-sm font-medium text-amber-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200">
                {user.user_metadata?.displayname || user.email}
              </span>
              <button
                onClick={confirmLogout}
                className="rounded-2xl border border-slate-200 px-3 py-2 text-sm font-semibold text-rose-600 transition hover:bg-rose-50 dark:border-slate-700 dark:text-rose-300 dark:hover:bg-slate-800"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="hidden items-center gap-2 md:flex">
              <Link
                href="/login"
                className="rounded-2xl border border-orange-200 bg-orange-50 px-3 py-2 text-sm font-medium text-orange-700 transition hover:bg-orange-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="rounded-2xl bg-orange-500 px-3 py-2 text-sm font-semibold text-white transition hover:bg-orange-600"
              >
                Sign Up
              </Link>
            </div>
          )}

          <button
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-700 transition hover:border-orange-300 hover:text-orange-600 dark:border-slate-700 dark:text-slate-200 md:hidden"
            onClick={() => setIsOpen((prev) => !prev)}
            aria-label="Toggle mobile menu"
          >
            {isOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="border-t border-slate-200 bg-white px-4 py-4 shadow-sm dark:border-slate-700 dark:bg-slate-950 md:hidden">
          <div className="flex flex-col gap-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="rounded-2xl px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-orange-50 dark:text-slate-200 dark:hover:bg-slate-800"
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="mt-4 flex flex-col gap-3 border-t border-slate-200 pt-4 dark:border-slate-700">
            <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 dark:border-slate-700 dark:bg-slate-800">
              <span className="text-sm font-medium text-slate-700 dark:text-slate-200">DarkMode</span>
              <ThemeToggle />
            </div>

            {!loading && user ? (
              <div className="space-y-3">
                <span className="block truncate rounded-2xl bg-slate-100 px-4 py-3 text-sm font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-200">
                 <span className="dark:text-gray-400 text-gray-600">Logged in as: </span><span className="dark:text-purple-400 text-purple-700 capitalize">{user.user_metadata?.displayname || user.user_metadata?.display_name || user.email}</span>
                </span>
                <button
                  onClick={() => {
                    confirmLogout();
                    setIsOpen(false);
                  }}
                  className="w-full rounded-2xl bg-rose-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-rose-500"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="grid gap-3 sm:grid-cols-2">
                <Link
                  href="/login"
                  onClick={() => setIsOpen(false)}
                  className="rounded-2xl border border-slate-200 px-4 py-3 text-center text-sm font-medium text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  onClick={() => setIsOpen(false)}
                  className="rounded-2xl bg-orange-500 px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-orange-600"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
