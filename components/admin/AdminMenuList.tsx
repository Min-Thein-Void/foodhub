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
    <div className="bg-white shadow-lg rounded-3xl p-6 md:p-8 dark:bg-slate-900">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">My Menus</h2>
          <p className="text-sm md:text-base text-gray-500 dark:text-slate-400 mt-1">
            View all menu items and their categories in one place.
          </p>
        </div>
        <div className="inline-flex rounded-full bg-blue-50 px-4 py-2 text-blue-700 text-sm font-medium dark:bg-blue-500/10 dark:text-blue-200">
          {menus.length} menu items
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm md:text-base">
          <thead className="border-b border-gray-200 dark:border-slate-700">
            <tr>
              <th className="py-3 px-4 font-semibold text-gray-700 dark:text-slate-200">Menu</th>
              <th className="py-3 px-4 font-semibold text-gray-700 dark:text-slate-200">Category</th>
              <th className="py-3 px-4 font-semibold text-gray-700 dark:text-slate-200">Price</th>
              <th className="py-3 px-4 font-semibold text-gray-700 dark:text-slate-200">Created</th>
            </tr>
          </thead>
          <tbody>
            {menus.map((menu) => (
              <tr key={menu.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors dark:border-slate-800 dark:hover:bg-slate-800">
                <td className="py-4 px-4">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 overflow-hidden rounded-xl bg-gray-100 dark:bg-slate-800">
                      <img
                        src={menu.image}
                        alt={menu.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div>
                      <div className="text-gray-800 font-medium dark:text-white">{menu.name}</div>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-4 text-gray-600 dark:text-slate-300">{menu.category?.name ?? 'Uncategorized'}</td>
                <td className="py-4 px-4 text-gray-800 dark:text-white">${menu.price.toFixed(2)}</td>
                <td className="py-4 px-4 text-gray-500 dark:text-slate-400">{new Date(menu.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default AdminMenuList
