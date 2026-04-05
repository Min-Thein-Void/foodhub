import AdminDashBoardCards from "./AdminDashBoardCards"
import AdminQuickActions from "./AdminQuickActions"
import SideBar from "./SideBar"

function AdminHome() {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Sidebar */}
      <SideBar/>

      {/* Main Content */}
      <div className="ml-0 md:ml-64 p-4 md:p-8 mx-auto max-w-7xl">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 md:mb-8">Dashboard</h1>

        {/* Dashboard Cards */}
        <AdminDashBoardCards/>

        {/* Quick Actions */}
        <AdminQuickActions/>
      </div>
    </div>
  )
}

export default AdminHome