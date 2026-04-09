import Link from "next/link";
import React from "react";

function AdminQuickActions() {
  return (
    <div className="bg-white shadow-lg rounded-xl p-6 dark:bg-slate-900">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
        Quick Actions
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link
          href="/admin/orders"
          className="block p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors dark:bg-blue-500/10 dark:hover:bg-blue-600/10"
        >
          <h3 className="font-medium text-blue-800 dark:text-blue-200">View All Orders</h3>
          <p className="text-sm text-blue-600 dark:text-blue-300">
            Manage and track customer orders
          </p>
        </Link>
        <Link
          href="/admin/customers"
          className="block p-4 bg-green-50 hover:bg-green-100 rounded-lg transition-colors dark:bg-emerald-500/10 dark:hover:bg-emerald-600/10"
        >
          <h3 className="font-medium text-green-800 dark:text-emerald-200">View All Customers</h3>
          <p className="text-sm text-green-600 dark:text-emerald-300">
            See customer information and history
          </p>
        </Link>
      </div>
    </div>
  );
}

export default AdminQuickActions;
