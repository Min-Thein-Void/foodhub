"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useCartStore } from "@/store/useCartStore";
import { CartItem } from "@/types/cart";
import Image from "next/image";
import toast, { Toaster } from "react-hot-toast";

const Navbar: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const cart: CartItem[] = useCartStore((state) => state.cart);

  const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);

 useEffect(() => {
  const getSession = async () => {
    const { data } = await supabase.auth.getSession();
    setUser(data.session?.user ?? null);
    setLoading(false); // ✅ done loading
  };
  getSession();

  const { data: listener } = supabase.auth.onAuthStateChange(
    (_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false); // ✅ update on change
    },
  );

  return () => {
    listener.subscription.unsubscribe();
  };
}, []);
  const handleLogout = () => {
    toast((t) => (
      <div className="flex flex-col gap-2">
        <span>Are you sure you want to logout?</span>
        <div className="flex gap-2 justify-end">
          <button
            onClick={() => toast.dismiss(t.id)}
            className="px-2 py-1 text-sm bg-gray-200 rounded"
          >
            Cancel
          </button>
          <button
            onClick={async () => {
              toast.dismiss(t.id);
              const { error } = await supabase.auth.signOut();

              if (error) {
                toast.error("Logout failed");
                return;
              }

              setUser(null);
              toast.success("Logged out successfully");
            }}
            className="px-2 py-1 text-sm bg-red-500 text-white rounded"
          >
            Logout
          </button>
        </div>
      </div>
    ));
  };

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-white shadow-sm relative">
      <Toaster position="top-center" />
      {/* Logo */}
      <div className="flex">
        <Image src="/foodlogo.png" alt="" width={75} height={40} />
        <span className="text-2xl font-bold text-yellow-600 mt-1">hub</span>
      </div>

      {/* Desktop Navigation */}
      <ul className="hidden md:flex space-x-8 text-amber-600 font-medium">
        <Link href="/" className="hover:text-orange-600">
          Home
        </Link>
        <Link href="/menus" className="hover:text-orange-600">
          Our Menus
        </Link>
        <Link href="#about" className="hover:text-orange-600">
          About Us
        </Link>
        <Link href="#contact" className="hover:text-orange-600">
          Creator
        </Link>
      </ul>

      {/* Actions */}
      <div className="flex items-center space-x-4">
        {/* Cart Icon */}
        <Link
          href="/checkout"
          className="relative text-orange-500 p-2.5 rounded-full hover:text-orange-600 transition"
        >
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
          <span className="absolute -top-1 -right-1 bg-white text-orange-500 text-[12px] font-bold px-1.5 py-0.5 rounded-full">
            {totalQty}
          </span>
        </Link>

        {/* Auth Actions */}
        {loading ? null : user  ? (
          <>
            <span className="text-purple-600 font-medium mr-3 border border-amber-300 px-2 rounded-2xl py-0.5">
                  {user.user_metadata?.displayname || user.email}
                </span>
            <button
              onClick={handleLogout}
              aria-label="Logout"
              className="md:flex hidden items-center justify-center px-1 py-2 rounded-md hover:text-red-600 transition text-red-500"
            >
              <svg
                className="w-6 h-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M20 12H8m12 0-4 4m4-4-4-4M9 4H7a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h2"
                />
              </svg>
            </button>
          </>
        ) : (
          <>
            <div className="md:flex gap-4 hidden">
                 {/* Login */}
                <Link
                  href="/login"
                  className="flex items-center gap-1.5 px-3 py-2 rounded-md bg-orange-50 hover:text-orange-600  hover:bg-orange-100 transition"
                >
                  <span className="sm:inline text-amber-600">Login</span>
                </Link>

                {/* Sign Up */}
                <Link
                  href="/register"
                  className="flex items-center gap-1.5 px-4 py-2 rounded-md bg-orange-500 text-white hover:bg-orange-600 shadow-sm transition"
                >
                  <span className="sm:inline">Sign Up</span>
                </Link>
               </div>
          </>
        )}

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-amber-600 focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {/* Hamburger Icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            {isOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-white shadow-md md:hidden">
          <ul className="flex flex-col items-center space-y-4 py-6 text-amber-600 font-medium">
            <Link
              href="/"
              onClick={() => setIsOpen(false)}
              className="w-full text-center py-2 hover:bg-orange-50 hover:text-orange-600 transition rounded-md"
            >
              Home
            </Link>
            <Link
              href="/menus"
              onClick={() => setIsOpen(false)}
              className="w-full text-center py-2 hover:bg-orange-50 hover:text-orange-600 transition rounded-md"
            >
              Our Menus
            </Link>
            <Link
              href="#about"
              onClick={() => setIsOpen(false)}
              className="w-full text-center py-2 hover:bg-orange-50 hover:text-orange-600 transition rounded-md"
            >
              About Us
            </Link>
            <Link
              href="#contact"
              onClick={() => setIsOpen(false)}
              className="w-full text-center py-2 hover:bg-orange-50 hover:text-orange-600 transition rounded-md"
            >
              Creator
            </Link>
          </ul>

          {/* Logout Button */}
          <div className="flex justify-center pb-6">
            {loading ? null : user  ? (
              <>
                <span className="text-purple-600 font-medium mt-1.5 mr-3 border border-amber-300 px-2 rounded-2xl py-0.5">
                  {user.user_metadata?.displayname || user.email}
                </span>
                <button
                  onClick={handleLogout}
                  aria-label="Logout"
                  className="flex items-center justify-center px-1 py-2 rounded-md hover:text-red-600 transition text-red-500"
                >
                  <svg
                    className="w-6 h-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M20 12H8m12 0-4 4m4-4-4-4M9 4H7a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h2"
                    />
                  </svg>
                </button>
              </>
            ) : (
              <>
               <div className="flex gap-4">
                 {/* Login */}
                <Link
                  href="/login"
                  className="flex items-center gap-1.5 px-3 py-2 rounded-md bg-orange-50 hover:text-orange-600  hover:bg-orange-100 transition"
                >
                  <span className="sm:inline text-amber-600">Login</span>
                </Link>

                {/* Sign Up */}
                <Link
                  href="/register"
                  className="flex items-center gap-1.5 px-4 py-2 rounded-md bg-orange-500 text-white hover:bg-orange-600 shadow-sm transition"
                >
                  <span className="sm:inline">Sign Up</span>
                </Link>
               </div>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
