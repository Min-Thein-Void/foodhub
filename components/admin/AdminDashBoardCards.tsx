import prisma from "@/lib/db";

async function AdminDashBoardCards() {
  const orders = await prisma.order.findMany();

  const orderLength = orders.length;
  const customersCount = new Set(orders.map((order) => order.userId)).size;
  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);

  return (
    <section className="grid grid-cols-1 gap-6 lg:grid-cols-3 mb-8">
      <div className="rounded-[2rem] border border-slate-200 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 p-6 text-white shadow-[0_35px_120px_-40px_rgba(15,23,42,0.3)] dark:border-slate-700">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-400">
              Total Orders
            </p>
            <p className="mt-4 text-5xl font-semibold tracking-tight text-white">
              {orderLength}
            </p>
          </div>
          <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-white/10 ring-1 ring-white/10">
            <span className="text-2xl">📦</span>
          </div>
        </div>
        <p className="mt-5 text-sm text-slate-300">Live order volume across the platform.</p>
      </div>

      <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-lg ring-1 ring-slate-200/70 dark:border-slate-700 dark:bg-slate-900">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-500 dark:text-slate-400">
              Total Customers
            </p>
            <p className="mt-4 text-5xl font-semibold tracking-tight text-emerald-600">
              {customersCount}
            </p>
          </div>
          <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-200">
            <span className="text-2xl">👥</span>
          </div>
        </div>
        <p className="mt-5 text-sm text-slate-500 dark:text-slate-400">Unique signed-in customers who placed orders.</p>
      </div>

      <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-lg ring-1 ring-slate-200/70 dark:border-slate-700 dark:bg-slate-900">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-500 dark:text-slate-400">
              Revenue
            </p>
            <p className="mt-4 text-5xl font-semibold tracking-tight text-slate-900 dark:text-white">
              ${totalRevenue.toFixed(2)}
            </p>
          </div>
          <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-violet-50 text-violet-700 dark:bg-violet-500/10 dark:text-violet-200">
            <span className="text-2xl">💰</span>
          </div>
        </div>
        <p className="mt-5 text-sm text-slate-500 dark:text-slate-400">Cumulative revenue from all orders.</p>
      </div>
    </section>
  );
}

export default AdminDashBoardCards;
