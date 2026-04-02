import Checkout from "@/components/Checkout";
import CheckoutItems from "@/components/CheckoutItems";

function Page() {
  return (
    <main className="min-h-screen bg-slate-50 py-12 dark:bg-slate-950">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 rounded-[2rem] bg-white p-8 shadow-[0_35px_120px_-40px_rgba(15,23,42,0.2)] ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-white/10">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-orange-500 dark:text-orange-300">
                Secure checkout
              </p>
              <h1 className="mt-3 text-3xl font-semibold text-slate-900 dark:text-white">
                Complete your order
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-400">
                Review your items, enter delivery details, and place your order with confidence. FoodHub ensures fast delivery and a seamless payment flow.
              </p>
            </div>
            <div className="rounded-3xl bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-200">
              <p>Trusted payment & fast delivery</p>
            </div>
          </div>
        </div>

        <div className="grid gap-8 xl:grid-cols-[1.05fr_0.95fr]">
          <CheckoutItems />
          <Checkout />
        </div>
      </div>
    </main>
  );
}

export default Page;