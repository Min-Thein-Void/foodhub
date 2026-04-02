"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import Link from "next/link";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignIn = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    setLoading(false);

    if (error) {
      console.error(error);
      alert(error.message);
      return;
    }

    alert("Signed in successfully!");
  };

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-12 dark:bg-slate-950">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1.05fr_0.95fr] items-center">
        <section className="rounded-[2rem] bg-white p-8 shadow-[0_35px_120px_-40px_rgba(15,23,42,0.2)] ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-white/10">
          <div className="inline-flex rounded-full bg-orange-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-orange-600 dark:bg-orange-500/20 dark:text-orange-300">
            Ready to order
          </div>
          <div className="mt-8 space-y-6">
            <h1 className="text-4xl font-semibold tracking-tight text-slate-900 dark:text-white">
              Welcome back to FoodHub.
            </h1>
            <p className="max-w-xl text-sm leading-7 text-slate-600 dark:text-slate-400">
              Sign in to continue browsing our signature menu, save your favorite meals, and get fast delivery on every order.
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            <div className="rounded-[1.5rem] bg-slate-50 p-5 ring-1 ring-slate-200 dark:bg-slate-950 dark:ring-white/10">
              <p className="text-sm font-semibold text-orange-500 dark:text-orange-300">Fast checkout</p>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">Save your details and checkout in seconds.</p>
            </div>
            <div className="rounded-[1.5rem] bg-slate-50 p-5 ring-1 ring-slate-200 dark:bg-slate-950 dark:ring-white/10">
              <p className="text-sm font-semibold text-orange-500 dark:text-orange-300">Easy repeat orders</p>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">Quick access to your past favorites and orders.</p>
            </div>
          </div>
        </section>

        <section className="rounded-[2rem] bg-white p-8 shadow-[0_35px_120px_-40px_rgba(15,23,42,0.2)] ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-white/10">
          <div className="mb-8 text-center">
            <p className="text-sm uppercase tracking-[0.35em] text-orange-500 dark:text-orange-300">
              Sign in
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-slate-900 dark:text-white">
              Access your account
            </h2>
            <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">
              Enter your credentials to continue to your FoodHub dashboard.
            </p>
          </div>

          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Email address
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-200 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:focus:border-orange-400 dark:focus:ring-orange-400/20"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-200 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:focus:border-orange-400 dark:focus:ring-orange-400/20"
              />
            </div>

            <button
              type="button"
              onClick={handleSignIn}
              disabled={loading}
              className="w-full rounded-full bg-orange-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-orange-500/20 transition hover:bg-orange-500 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </div>

          <p className="mt-8 text-center text-sm text-slate-500 dark:text-slate-400">
            Don’t have an account?{' '}
            <Link href="/register" className="font-semibold text-orange-600 hover:text-orange-500 dark:text-orange-300">
              Create one
            </Link>
          </p>
        </section>
      </div>
    </main>
  );
}
