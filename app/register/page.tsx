"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import Link from "next/link";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayname, setDisplayname] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          displayname,
        },
      },
    });

    setLoading(false);

    if (error) {
      alert(error.message);
    } else {
      alert("Registration successful! Check your email to confirm your account.");
      setEmail("");
      setPassword("");
      setDisplayname("");
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-12 dark:bg-slate-950">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1.05fr_0.95fr] items-center">
        <section className="space-y-8 rounded-[2rem] bg-white p-8 shadow-[0_35px_120px_-40px_rgba(15,23,42,0.2)] ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-white/10">
          <div className="inline-flex rounded-full bg-orange-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-orange-600 dark:bg-orange-500/15 dark:text-orange-300">
            Welcome to FoodHub
          </div>
          <div className="space-y-4">
            <h1 className="text-4xl font-semibold tracking-tight text-slate-900 dark:text-white">
              Join the freshest food experience.
            </h1>
            <p className="max-w-xl text-sm leading-7 text-slate-600 dark:text-slate-400">
              Create your account to unlock fast delivery, exclusive offers, and curated menus tailored to your taste. Sign up in seconds and start ordering your favorites.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-[1.5rem] bg-slate-50 p-5 ring-1 ring-slate-200 dark:bg-slate-950 dark:ring-white/10">
              <p className="text-sm font-semibold text-orange-500 dark:text-orange-300">Fast ordering</p>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">Save your details for quicker checkout next time.</p>
            </div>
            <div className="rounded-[1.5rem] bg-slate-50 p-5 ring-1 ring-slate-200 dark:bg-slate-950 dark:ring-white/10">
              <p className="text-sm font-semibold text-orange-500 dark:text-orange-300">Exclusive rewards</p>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">Get special offers and menu updates delivered to you.</p>
            </div>
          </div>
        </section>

        <section className="rounded-[2rem] bg-white p-8 shadow-[0_35px_120px_-40px_rgba(15,23,42,0.2)] ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-white/10">
          <div className="mb-8 text-center">
            <p className="text-sm uppercase tracking-[0.35em] text-orange-500 dark:text-orange-300">Create account</p>
            <h2 className="mt-3 text-3xl font-semibold text-slate-900 dark:text-white">Start your FoodHub journey</h2>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
              Enter your details below to register and start ordering delicious meals.
            </p>
          </div>

          <form onSubmit={handleRegister} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Display name
              </label>
              <input
                type="text"
                value={displayname}
                onChange={(e) => setDisplayname(e.target.value)}
                placeholder="John Doe"
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-200 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:focus:border-orange-400 dark:focus:ring-orange-400/20"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Email address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-200 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:focus:border-orange-400 dark:focus:ring-orange-400/20"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-200 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:focus:border-orange-400 dark:focus:ring-orange-400/20"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-full bg-orange-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-orange-500/20 transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "Creating account..." : "Register"}
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-slate-500 dark:text-slate-400">
            Already have an account?{' '}
            <Link href="/login" className="font-semibold text-orange-600 hover:text-orange-500 dark:text-orange-300">
              Sign in
            </Link>
          </p>
        </section>
      </div>
    </main>
  );
}
