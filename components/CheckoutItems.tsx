"use client";

import { useCartStore } from "@/store/useCartStore";
import { CartItem } from "@/types/cart";
import toast, { Toaster } from "react-hot-toast";

function CheckoutItems() {
  const cart: CartItem[] = useCartStore((state) => state.cart);

  const total = cart.reduce((acc, item) => acc + item.price * item.qty, 0);

  const clearBasket = useCartStore((state) => state.clearCart);

  const handleClearCart = () => {
    if (cart.length === 0) {
      toast.error("No items in your basket to remove.", {
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
      return;
    }
    clearBasket();
    toast.success("Your basket is now empty.", {
      icon: "🛒",
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
    <div className="w-full rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_18px_60px_-30px_rgba(15,23,42,0.25)] dark:border-slate-800 dark:bg-slate-950">
      <Toaster position="top-center" reverseOrder={false} />

      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-orange-500 dark:text-orange-300">
            Order preview
          </p>
          <h3 className="mt-2 text-2xl font-semibold text-slate-900 dark:text-white">
            Your basket
          </h3>
        </div>

        <button
          onClick={handleClearCart}
          className="inline-flex items-center justify-center rounded-full border border-orange-200 bg-orange-50 px-4 py-2 text-sm font-semibold text-orange-700 transition hover:bg-orange-100 dark:border-orange-500/20 dark:bg-orange-500/10 dark:text-orange-200"
        >
          Reset basket
        </button>
      </div>

      {cart.length === 0 ? (
        <div className="rounded-[24px] border border-dashed border-slate-200 bg-slate-50 p-8 text-center text-sm text-slate-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400">
          Your cart is empty. Add delicious items to get started.
        </div>
      ) : (
        <>
          <div className="space-y-4">
            {cart.map((item, index) => (
              <div
                key={index}
                className="rounded-[20px] border border-slate-200 bg-slate-50 p-4 shadow-sm transition hover:border-orange-300 dark:border-slate-700 dark:bg-slate-900"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-16 w-16 rounded-2xl object-cover"
                  />
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                      {item.name}
                    </p>
                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                      Qty {item.qty} · ${item.price.toFixed(2)} each
                    </p>
                  </div>
                  <div className="ml-auto text-right">
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">
                      Total
                    </p>
                    <p className="mt-1 text-sm font-semibold text-orange-600 dark:text-orange-300">
                      ${(item.price * item.qty).toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-[20px] bg-orange-50 p-5 text-slate-900 dark:bg-orange-500/10 dark:text-slate-100">
            <div className="flex items-center justify-between text-sm text-slate-600 dark:text-slate-300">
              <span>Subtotal</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <div className="mt-3 flex items-center justify-between text-sm text-slate-600 dark:text-slate-300">
              <span>Delivery</span>
              <span>$3.50</span>
            </div>
            <div className="mt-4 border-t border-slate-200 pt-4 text-base font-semibold text-slate-900 dark:border-slate-700 dark:text-white">
              <span>Total</span>
              <span>${(total + 3.5).toFixed(2)}</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default CheckoutItems;
