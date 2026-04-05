function AdminCustomerList() {
  return (
    <div className="bg-white shadow-lg rounded-xl p-4 md:p-6">
      <div className="overflow-x-auto -mx-4 md:mx-0">
        <div className="inline-block min-w-full align-middle">
          <table className="min-w-full table-auto">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-2 md:py-3 px-2 md:px-4 font-semibold text-gray-700 text-sm md:text-base">
                  Name
                </th>
                <th className="text-left py-2 md:py-3 px-2 md:px-4 font-semibold text-gray-700 text-sm md:text-base">
                  Email
                </th>
                <th className="text-left py-2 md:py-3 px-2 md:px-4 font-semibold text-gray-700 text-sm md:text-base">
                  Phone
                </th>
                <th className="text-left py-2 md:py-3 px-2 md:px-4 font-semibold text-gray-700 text-sm md:text-base">
                  Orders
                </th>
                <th className="text-left py-2 md:py-3 px-2 md:px-4 font-semibold text-gray-700 text-sm md:text-base">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-3 md:py-4 px-2 md:px-4 font-medium text-sm md:text-base">John Doe</td>
                <td className="py-3 md:py-4 px-2 md:px-4 text-sm md:text-base">john@example.com</td>
                <td className="py-3 md:py-4 px-2 md:px-4 text-sm md:text-base">+1 234 567 8901</td>
                <td className="py-3 md:py-4 px-2 md:px-4 text-sm md:text-base">5</td>
                <td className="py-3 md:py-4 px-2 md:px-4">
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs md:text-sm">
                    Active
                  </span>
                </td>
              </tr>
              <tr className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-3 md:py-4 px-2 md:px-4 font-medium text-sm md:text-base">Jane Smith</td>
                <td className="py-3 md:py-4 px-2 md:px-4 text-sm md:text-base">jane@example.com</td>
                <td className="py-3 md:py-4 px-2 md:px-4 text-sm md:text-base">+1 234 567 8902</td>
                <td className="py-3 md:py-4 px-2 md:px-4 text-sm md:text-base">3</td>
                <td className="py-3 md:py-4 px-2 md:px-4">
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs md:text-sm">
                    Active
                  </span>
                </td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="py-3 md:py-4 px-2 md:px-4 font-medium text-sm md:text-base">Bob Johnson</td>
                <td className="py-3 md:py-4 px-2 md:px-4 text-sm md:text-base">bob@example.com</td>
                <td className="py-3 md:py-4 px-2 md:px-4 text-sm md:text-base">+1 234 567 8903</td>
                <td className="py-3 md:py-4 px-2 md:px-4 text-sm md:text-base">1</td>
                <td className="py-3 md:py-4 px-2 md:px-4">
                  <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs md:text-sm">
                    Inactive
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AdminCustomerList;
