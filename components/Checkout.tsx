"use client";

import { useCartStore } from "@/store/useCartStore";
import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

type FormData = {
  name: string;
  phone: string;
  address: string;
};

function Checkout() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    name: "",
    phone: "",
    address: "",
  });
  const [user, setUser] = useState<any>(null);
  const [authLoading, setAuthLoading] = useState(true);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const cart = useCartStore((state) => state.cart);
  const clearCart = useCartStore((state) => state.clearCart);
  const orderTotal = cart.reduce((acc, item) => acc + item.price * item.qty, 0);

  useEffect(() => {
    const fetchSession = async () => {
      const { data } = await supabase.auth.getSession();
      setUser(data.session?.user ?? null);
      setAuthLoading(false);
    };

    fetchSession();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
        setAuthLoading(false);
      },
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (authLoading) {
      toast.error("Please wait while we check your authentication");
      return;
    }

    if (!user) {
      toast.error("Please log in to place an order");
      router.push("/login");
      return;
    }

    const order = {
      ...formData,
      items: cart,
      total: orderTotal,
    };

    // Get the current session to include the access token
    const { data: sessionData } = await supabase.auth.getSession();
    if (!sessionData.session?.access_token) {
      toast.error("Authentication session expired. Please log in again.");
      router.push("/login");
      return;
    }

    const res = await toast.promise(
      fetch("/api/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${sessionData.session.access_token}`,
        },
        body: JSON.stringify(order),
      }),
      {
        loading: "Placing your order...",
        success: "Order အောင်မြင်စွာတင်ပြီးပါပြီ",
        error: "Failed to place order, please try again.",
      },
      {
        style: {
          border: "1px solid #F97316",
          padding: "16px",
          color: "#9A3412",
        },
        iconTheme: {
          primary: "#F97316",
          secondary: "#FFFAEE",
        },
      },
    );

    if (!res.ok) {
      const text = await res.text();
      console.error("API error:", text);
      toast.error("Failed to place order. Please try again.");
      return;
    }

    router.push("/menus");
    await res.json();
    clearCart();
    setFormData({ name: "", phone: "", address: "" });
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <Toaster position="top-center" reverseOrder={true} />

      <div className="rounded-[2rem] bg-slate-50 p-6 shadow-[0_25px_80px_-40px_rgba(15,23,42,0.25)] ring-1 ring-slate-200 dark:bg-slate-950 dark:ring-white/10">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-orange-500 dark:text-orange-300">
              Checkout Details
            </p>
            <h1 className="mt-3 text-3xl font-semibold text-slate-900 dark:text-white">
              Finish your order
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-400">
              Fill in your delivery details and confirm to send your fresh meal on its way.
            </p>
          </div>

          <div className="rounded-[1.5rem] border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 shadow-sm dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200">
            <p>{cart.length} items</p>
            <p className="mt-1 text-lg font-semibold text-orange-600 dark:text-orange-300">
              ${orderTotal.toFixed(2)}
            </p>
          </div>
        </div>

        <div className="mt-8 grid gap-6 xl:grid-cols-[1.6fr_1fr]">
          <section className="rounded-[1.75rem] bg-white p-6 shadow-sm ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-white/10">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-6">
              Shipping information
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                  Customer name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-200 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:focus:border-orange-400 dark:focus:ring-orange-400/20"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                  Phone number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-200 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:focus:border-orange-400 dark:focus:ring-orange-400/20"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                  Shipping address
                </label>
                <textarea
                  name="address"
                  rows={4}
                  value={formData.address}
                  onChange={handleChange}
                  className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-200 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:focus:border-orange-400 dark:focus:ring-orange-400/20"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-full bg-orange-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-orange-500/20 transition hover:bg-orange-500"
              >
                Place Order
              </button>
            </form>
          </section>

          <aside className="rounded-[1.75rem] bg-slate-50 p-6 shadow-sm ring-1 ring-slate-200 dark:bg-slate-950 dark:ring-white/10">
            <div className="mb-6">
              <p className="text-sm uppercase tracking-[0.3em] text-orange-500 dark:text-orange-300">
                Order summary
              </p>
              <h2 className="mt-3 text-xl font-semibold text-slate-900 dark:text-white">
                Review your order
              </h2>
            </div>

            <div className="space-y-4">
              {cart.map((item) => (
                <div key={item.id} className="flex items-center justify-between rounded-2xl bg-white px-4 py-3 shadow-sm dark:bg-slate-900">
                  <div>
                    <p className="font-medium text-slate-900 dark:text-slate-100">{item.name}</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Qty: {item.qty}</p>
                  </div>
                  <p className="font-semibold text-slate-900 dark:text-slate-100">
                    ${(item.price * item.qty).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-2xl bg-slate-100 p-5 dark:bg-slate-900">
              <div className="flex items-center justify-between text-sm text-slate-500 dark:text-slate-400">
                <span>Subtotal</span>
                <span>${orderTotal.toFixed(2)}</span>
              </div>
              <div className="mt-4 flex items-center justify-between text-sm text-slate-500 dark:text-slate-400">
                <span>Delivery</span>
                <span>$3.50</span>
              </div>
              <div className="mt-4 flex items-center justify-between text-base font-semibold text-slate-900 dark:text-slate-100">
                <span>Total</span>
                <span>${(orderTotal + 3.5).toFixed(2)}</span>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
