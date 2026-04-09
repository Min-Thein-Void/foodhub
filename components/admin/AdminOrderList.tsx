interface OrderItemProps {
  qty: number;
  menu: {
    name: string;
  };
}

interface AdminOrderProps {
  id: string;
  userId: string;
  userEmail?: string | null;
  userDisplayName?: string | null;
  customerName: string;
  phone: string;
  address: string;
  total: number;
  status: string;
  createdAt: string | Date;
  items: OrderItemProps[];
}

function AdminOrderList({ orders }: { orders: AdminOrderProps[] }) {
  return (
    <div className="bg-white shadow-lg rounded-xl p-4 md:p-6 dark:bg-slate-900">
  <div className="overflow-x-auto -mx-4 md:mx-0">
    <div className="inline-block min-w-full align-middle">
      <table className="min-w-full table-auto">
        <thead>
          <tr className="border-b border-gray-200 dark:border-slate-700">
            <th className="text-left py-2 md:py-3 px-2 md:px-4 font-semibold text-gray-700 dark:text-slate-100 text-sm md:text-base">
              Order ID
            </th>
            <th className="text-left py-2 md:py-3 px-2 md:px-4 font-semibold text-gray-700 dark:text-slate-100 text-sm md:text-base">
              Customer
            </th>
            <th className="text-left py-2 md:py-3 px-2 md:px-4 font-semibold text-gray-700 dark:text-slate-100 text-sm md:text-base">
              Email
            </th>
            <th className="text-left py-2 md:py-3 px-2 md:px-4 font-semibold text-gray-700 dark:text-slate-100 text-sm md:text-base">
              Items
            </th>
            <th className="text-left py-2 md:py-3 px-2 md:px-4 font-semibold text-gray-700 dark:text-slate-100 text-sm md:text-base">
              Status
            </th>
            <th className="text-left py-2 md:py-3 px-2 md:px-4 font-semibold text-gray-700 dark:text-slate-100 text-sm md:text-base">
              Total
            </th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => {
            const itemList = order.items
              .map((item) => `${item.qty}x ${item.menu.name}`)
              .join(", ");

            const statusClass =
              order.status === "delivered"
                ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                : order.status === "pending"
                ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                : order.status === "cancelled"
                ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                : "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";

            return (
              <tr
                key={order.id}
                className="border-b border-gray-100 hover:bg-gray-50 dark:border-slate-800 dark:hover:bg-slate-800"
              >
                <td className="py-3 md:py-4 px-2 md:px-4 font-medium text-sm md:text-base text-gray-900 dark:text-slate-100">
                  {order.id.slice(0, 8)}...
                </td>
                <td className="py-3 md:py-4 px-2 md:px-4 text-sm md:text-base text-gray-900 dark:text-slate-100">
                  {order.userDisplayName || order.customerName}
                </td>
                <td className="py-3 md:py-4 px-2 md:px-4 text-sm md:text-base text-gray-900 dark:text-slate-100">
                  {order.userEmail || "N/A"}
                </td>
                <td
                  className="py-3 md:py-4 px-2 md:px-4 text-sm md:text-base max-w-xs truncate text-gray-900 dark:text-slate-100"
                  title={itemList}
                >
                  {itemList}
                </td>
                <td className="py-3 md:py-4 px-2 md:px-4">
                  <span
                    className={`${statusClass} px-2 py-1 rounded-full text-xs md:text-sm`}
                  >
                    {order.status.charAt(0).toUpperCase() +
                      order.status.slice(1)}
                  </span>
                </td>
                <td className="py-3 md:py-4 px-2 md:px-4 font-semibold text-sm md:text-base text-gray-900 dark:text-slate-100">
                  ${order.total.toFixed(2)}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  </div>
</div>

  );
}

export default AdminOrderList;
