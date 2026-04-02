"use client";

import { supabase } from "@/lib/supabaseClient";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Home: React.FC = () => {

  const [user,setUser] = useState<any>();

  useEffect(() => {
      const fetchSession = async () => {
        const { data } = await supabase.auth.getSession();
        setUser(data.session?.user ?? null);
      };
  
      fetchSession();
  
      const { data: listener } = supabase.auth.onAuthStateChange(
        (_event, session) => {
          setUser(session?.user ?? null);
        },
      );
  
      return () => {
        listener.subscription.unsubscribe();
      };
    }, []);

  return (
    <main className="bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-orange-500/20 to-transparent dark:from-orange-500/10" />

        <section className="relative mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-24">
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div className="space-y-8">
              <div className="inline-flex rounded-full bg-orange-500/10 px-4 py-2 text-sm font-semibold uppercase tracking-[0.3em] text-orange-500 dark:bg-orange-500/15 dark:text-orange-300">
                Fresh meals, made easy
              </div>

              <div className="space-y-6">
                <h1 className="max-w-3xl text-4xl font-semibold leading-tight text-slate-900 sm:text-5xl dark:text-white">
                  Hot & fresh food delivered quickly, every time.
                </h1>
                <p className="max-w-xl text-lg leading-8 text-slate-600 dark:text-slate-300">
                  Browse our handcrafted menu, customize your favorites, and enjoy fast delivery straight to your door. FoodHub brings restaurant-quality meals to your table with a modern, friendly experience.
                </p>
              </div>

              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <Link
                  href="/menus"
                  className="inline-flex items-center justify-center rounded-full bg-orange-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-orange-500/20 transition hover:bg-orange-400"
                >
                  Browse menu
                </Link>
                {
                  !user && (
                     <Link
                  href="/register"
                  className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800"
                >
                  Join FoodHub
                </Link>
                  )
                }
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <div className="rounded-3xl bg-slate-50 p-5 text-slate-700 ring-1 ring-slate-200/70 dark:bg-white/5 dark:text-slate-200 dark:ring-white/10">
                  <p className="text-sm font-semibold text-orange-500 dark:text-orange-300">Rapid delivery</p>
                  <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                    Receive your order hot and fast with city-wide delivery coverage.
                  </p>
                </div>
                <div className="rounded-3xl bg-slate-50 p-5 text-slate-700 ring-1 ring-slate-200/70 dark:bg-white/5 dark:text-slate-200 dark:ring-white/10">
                  <p className="text-sm font-semibold text-orange-500 dark:text-orange-300">Curated menu</p>
                  <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                    Discover chef-inspired dishes, seasonal specials, and trending favorites.
                  </p>
                </div>
                <div className="rounded-3xl bg-slate-50 p-5 text-slate-700 ring-1 ring-slate-200/70 dark:bg-white/5 dark:text-slate-200 dark:ring-white/10">
                  <p className="text-sm font-semibold text-orange-500 dark:text-orange-300">Easy ordering</p>
                  <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                    Smooth checkout, saved preferences, and one-click reorder for repeat meals.
                  </p>
                </div>
              </div>
            </div>

            <div className="mx-auto flex max-w-xl items-center justify-center">
              <div className="relative w-full overflow-hidden rounded-[2.5rem] border border-slate-200/50 bg-slate-50/90 p-5 shadow-2xl shadow-slate-300/10 backdrop-blur-xl dark:border-white/10 dark:bg-white/5 dark:shadow-black/20">
                <div className="absolute -right-10 -top-10 h-36 w-36 rounded-full bg-orange-500/20 blur-3xl" />
                <div className="relative overflow-hidden rounded-[2rem] bg-slate-100 dark:bg-slate-950">
                  <Image
                    src="/cheesepizza.png"
                    alt="Delicious pizza on a dark background"
                    width={600}
                    height={600}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="mt-6 rounded-[1.75rem] bg-white px-5 py-6 ring-1 ring-slate-200/70 dark:bg-slate-900/90 dark:ring-white/10">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-xs uppercase tracking-[0.3em] text-orange-500 dark:text-orange-300">Featured</p>
                      <h2 className="mt-3 text-xl font-semibold text-slate-900 dark:text-white">Classic Cheese Pizza</h2>
                    </div>
                    <span className="rounded-full bg-orange-500 px-3 py-1 text-sm font-semibold text-white">
                      $9.99
                    </span>
                  </div>
                  <p className="mt-4 text-sm leading-6 text-slate-600 dark:text-slate-400">
                    A crowd favorite with melted mozzarella, tomato sauce, and a crisp golden crust.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 pb-16 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="rounded-[2rem] bg-slate-50 p-8 ring-1 ring-slate-200/70 dark:bg-white/5 dark:ring-white/10">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-orange-500 dark:text-orange-300">Why FoodHub</p>
              <h2 className="mt-4 text-2xl font-semibold text-slate-900 dark:text-white">A better way to eat well.</h2>
              <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400">
                Enjoy premium meals curated for every craving, with real-time order tracking and friendly customer support whenever you need it.
              </p>
            </div>

            <div className="rounded-[2rem] bg-slate-50 p-8 ring-1 ring-slate-200/70 dark:bg-white/5 dark:ring-white/10">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-orange-500 dark:text-orange-300">Top categories</p>
              <ul className="mt-6 space-y-4 text-slate-700 dark:text-slate-200">
                <li className="flex items-center gap-3">
                  <span className="inline-flex h-2.5 w-2.5 rounded-full bg-orange-500" />
                  Artisan Pizza
                </li>
                <li className="flex items-center gap-3">
                  <span className="inline-flex h-2.5 w-2.5 rounded-full bg-orange-500" />
                  Gourmet Burgers
                </li>
                <li className="flex items-center gap-3">
                  <span className="inline-flex h-2.5 w-2.5 rounded-full bg-orange-500" />
                  Fresh Salads
                </li>
              </ul>
            </div>

            <div className="rounded-[2rem] bg-slate-50 p-8 ring-1 ring-slate-200/70 dark:bg-white/5 dark:ring-white/10">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-orange-500 dark:text-orange-300">Fast facts</p>
              <div className="mt-6 grid gap-4">
                <div className="rounded-3xl bg-white p-4 dark:bg-slate-900/80">
                  <p className="text-3xl font-semibold text-slate-900 dark:text-white">4.9/5</p>
                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">average review rating</p>
                </div>
                <div className="rounded-3xl bg-white p-4 dark:bg-slate-900/80">
                  <p className="text-3xl font-semibold text-slate-900 dark:text-white">10k+</p>
                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">happy customers</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Home;
