"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useCartStore } from "@/store/useCartStore";
import { CartItem } from "@/types/cart";

const Navbar: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const cart: CartItem[] = useCartStore((state) => state.cart);

  console.log(cart);

  const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);

  useEffect(() => {
    // Get current session
    const getSession = async () => {
      const { data } = await supabase.auth.getSession();
      setUser(data.session?.user ?? null);
    };
    getSession();

    // Listen for auth changes
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      },
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  return (
    <nav className="flex items-center justify-between px-8 py-4 bg-white shadow-sm">
      {/* Logo */}
      <div className="text-2xl font-bold text-gray-800">FoodHub</div>

      {/* Navigation Links */}
      <ul className="hidden md:flex space-x-8 text-gray-700 font-medium">
        <Link href="/" className="hover:text-blue-600">
          Home
        </Link>
        <Link href="/menus" className="hover:text-blue-600">
          Our Menus
        </Link>
        <Link href="#about" className="hover:text-blue-600">
          About us
        </Link>
        <Link href="#contact" className="hover:text-blue-600">
          Creator
        </Link>
      </ul>

      {/* Actions */}
      <div className="flex items-center space-x-4">
        {/* Cart Icon */}
        <button className="relative text-orange-500 p-2.5 rounded-full hover:text-orange-600 transition">
          <Link href="/checkout">
            {" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 8h16l-1.5 10a2 2 0 01-2 1.5H7.5a2 2 0 01-2-1.5L4 8z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 8V6a3 3 0 016 0v2"
              />
            </svg>
          </Link>
          <span className="absolute -top-1 -right-1 bg-white text-orange-500 text-[12px] font-bold px-1.5 py-0.5 rounded-full">
            {totalQty}
          </span>
        </button>

        {/* Auth Actions */}
        {user ? (
          <>
            <span className="text-gray-700 font-medium">
              {user.user_metadata?.displayname || user.email}
            </span>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded-md font-medium hover:bg-red-600"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              href="/login"
              className="text-gray-700 font-medium hover:text-orange-600"
            >
              Log in
            </Link>
            <Link
              href="/register"
              className="bg-orange-600 text-white px-4 py-2 rounded-md font-medium hover:bg-orange-700"
            >
              Sign up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
