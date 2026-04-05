import prisma from "@/lib/db";
import React from "react";

async function AdminDashBoardCards() {

  const orders = await prisma.order.findMany()

  const orderLength = orders.length

  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0)

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      <div className="bg-white shadow-lg rounded-xl p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          Total Orders
        </h3>
        <p className="text-3xl font-bold text-blue-600">{orderLength}</p>
        <p className="text-sm text-gray-500 mt-2">+12% from last month</p>
      </div>
      <div className="bg-white shadow-lg rounded-xl p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          Total Customers
        </h3>
        <p className="text-3xl font-bold text-green-600">3</p>
        <p className="text-sm text-gray-500 mt-2">+8% from last month</p>
      </div>
      <div className="bg-white shadow-lg rounded-xl p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Revenue</h3>
        <p className="text-3xl font-bold text-purple-600">${totalRevenue}</p>
        <p className="text-sm text-gray-500 mt-2">+15% from last month</p>
      </div>
    </div>
  );
}

export default AdminDashBoardCards;
