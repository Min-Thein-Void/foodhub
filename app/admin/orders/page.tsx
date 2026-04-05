import prisma from '@/lib/db'
import AdminOrderList from '../../../components/admin/AdminOrderList'
import SideBar from '@/components/admin/SideBar'

async function OrdersPage() {

  const orders = await prisma.order.findMany({
    include: {
      items: {
        include: {
          menu: true,
        },
      },
    },
  })

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Sidebar */}
      <SideBar/>

      {/* Main Content */}
      <div className="ml-0 md:ml-64 p-4 md:p-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 md:mb-8">Orders</h1>

        {/* Order List */}
        <AdminOrderList orders={orders} />
      </div>
    </div>
  )
}

export default OrdersPage