import Link from "next/link";
import React from "react";

function AdminQuickActions() {
  return (
    <div className="bg-white shadow-lg rounded-xl p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Quick Actions
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link
          href="/admin/orders"
          className="block p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
        >
          <h3 className="font-medium text-blue-800">View All Orders</h3>
          <p className="text-sm text-blue-600">
            Manage and track customer orders
          </p>
        </Link>
        <Link
          href="/admin/customers"
          className="block p-4 bg-green-50 hover:bg-green-100 rounded-lg transition-colors"
        >
          <h3 className="font-medium text-green-800">View All Customers</h3>
          <p className="text-sm text-green-600">
            See customer information and history
          </p>
        </Link>
      </div>
    </div>
  );
}

export default AdminQuickActions;
