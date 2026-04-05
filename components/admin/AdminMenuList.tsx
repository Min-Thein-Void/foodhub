import prisma from '@/lib/db'
import React from 'react'

async function AdminMenuList() {
  const menus = await prisma.menu.findMany({
    include: {
      category: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  return (
    <div className="bg-white shadow-lg rounded-3xl p-6 md:p-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900">My Menus</h2>
          <p className="text-sm md:text-base text-gray-500 mt-1">
            View all menu items and their categories in one place.
          </p>
        </div>
        <div className="inline-flex rounded-full bg-blue-50 px-4 py-2 text-blue-700 text-sm font-medium">
          {menus.length} menu items
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm md:text-base">
          <thead className="border-b border-gray-200">
            <tr>
              <th className="py-3 px-4 font-semibold text-gray-700">Menu</th>
              <th className="py-3 px-4 font-semibold text-gray-700">Category</th>
              <th className="py-3 px-4 font-semibold text-gray-700">Price</th>
              <th className="py-3 px-4 font-semibold text-gray-700">Created</th>
            </tr>
          </thead>
          <tbody>
            {menus.map((menu) => (
              <tr key={menu.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                <td className="py-4 px-4">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 overflow-hidden rounded-xl bg-gray-100">
                      <img
                        src={menu.image}
                        alt={menu.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div>
                      <div className="text-gray-800 font-medium">{menu.name}</div>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-4 text-gray-600">{menu.category?.name ?? 'Uncategorized'}</td>
                <td className="py-4 px-4 text-gray-800">${menu.price.toFixed(2)}</td>
                <td className="py-4 px-4 text-gray-500">{new Date(menu.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default AdminMenuList
