import prisma from "@/lib/db";

type CustomerInfo = {
  id: string;
  name: string;
  email: string;
  phone: string;
  orderCount: number;
};

async function AdminCustomerList() {
  const orders = await prisma.order.findMany({
    orderBy: { createdAt: "desc" },
  });

  const customerMap = new Map<string, CustomerInfo>();

  for (const order of orders) {
    const customerId = order.userId;
    const name = order.userDisplayName || order.customerName || "Unknown";
    const email = order.userEmail || "-";
    const phone = order.phone || "-";

    if (!customerMap.has(customerId)) {
      customerMap.set(customerId, {
        id: customerId,
        name,
        email,
        phone,
        orderCount: 1,
      });
    } else {
      const existing = customerMap.get(customerId)!;
      existing.orderCount += 1;
      if (!existing.phone && phone) existing.phone = phone;
      if (!existing.email && email) existing.email = email;
      if (!existing.name && name) existing.name = name;
    }
  }

  const customers = Array.from(customerMap.values());
  const totalCustomers = customers.length;
  const totalOrders = orders.length;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Total Customers</p>
          <p className="mt-3 text-3xl font-semibold text-slate-900 dark:text-white">{totalCustomers}</p>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Unique customers from all orders</p>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Total Orders</p>
          <p className="mt-3 text-3xl font-semibold text-slate-900 dark:text-white">{totalOrders}</p>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Orders placed by customers</p>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Latest Customer</p>
          <p className="mt-3 text-2xl font-semibold text-slate-900 dark:text-white">
            {customers[0]?.name || "No customers yet"}
          </p>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Most recent customer record</p>
        </div>
      </div>

      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-950">
        <div className="border-b border-slate-200 bg-slate-50 px-6 py-4 dark:border-slate-700 dark:bg-slate-900">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Customer List</h2>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">All customers from orders, grouped by user.</p>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full border-separate border-spacing-0">
            <thead className="bg-white text-left text-sm uppercase tracking-[0.12em] text-slate-500">
              <tr>
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Email</th>
                <th className="px-6 py-4">Phone</th>
                <th className="px-6 py-4">Orders</th>
              </tr>
            </thead>
            <tbody>
              {customers.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-10 text-center text-sm text-slate-500">
                    No customers found yet.
                  </td>
                </tr>
              ) : (
                customers.map((customer, index) => (
                  <tr
                    key={customer.id}
                    className={index % 2 === 0 ? "bg-slate-50 dark:bg-slate-950" : "bg-white dark:bg-slate-900"}
                  >
                    <td className="px-6 py-4 align-top">
                      <p className="font-semibold text-slate-900 dark:text-white">{customer.name}</p>
                      <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">ID: {customer.id.slice(0, 8)}...</p>
                    </td>
                    <td className="px-6 py-4 align-top text-slate-700 dark:text-slate-200">{customer.email}</td>
                    <td className="px-6 py-4 align-top text-slate-700 dark:text-slate-200">{customer.phone}</td>
                    <td className="px-6 py-4 align-top">
                      <span className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-200">
                        {customer.orderCount}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AdminCustomerList;
