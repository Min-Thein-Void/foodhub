import AdminCustomerList from '@/components/admin/AdminCustomerList'
import SideBar from '@/components/admin/SideBar'

function CustomersPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Sidebar */}
      <SideBar/>

      {/* Main Content */}
      <div className="ml-0 md:ml-64 p-4 md:p-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 md:mb-8">Customers</h1>

        {/* Customer List */}
        <AdminCustomerList/>
      </div>
    </div>
  )
}

export default CustomersPage