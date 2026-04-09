import AdminMenuList from '@/components/admin/AdminMenuList'
import SideBar from '@/components/admin/SideBar'

function MenusPage() {
  return (
    <div className="bg-gray-50 dark:bg-slate-950 min-h-screen">
      <SideBar />
      <div className="ml-0 md:ml-64 p-4 md:p-8">
        <AdminMenuList />
      </div>
    </div>
  )
}

export default MenusPage
