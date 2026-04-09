"use client"

import Link from "next/link";
import { useState } from "react";

function SideBar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="fixed top-20 left-4 z-20 md:hidden p-2 bg-gray-100/50 hover:bg-gray-200 rounded-md transition-colors dark:bg-slate-800/70 dark:hover:bg-slate-700"
      >
        <svg className="w-6 h-6 text-gray-600 dark:text-slate-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMobileOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
        </svg>
      </button>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-transparent bg-opacity-50 z-30 md:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        ${isCollapsed ? 'w-16' : 'w-64'} 
        fixed top-0 left-0 h-screen bg-white shadow-lg border-r border-gray-200 dark:bg-slate-950 dark:border-slate-800 
        transition-all duration-300 ease-in-out z-40
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <div className="p-4 md:p-6 flex items-center justify-between">
          {!isCollapsed && <h2 className="text-lg md:text-xl font-bold text-gray-800 dark:text-white">Admin Panel</h2>}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hidden md:block p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isCollapsed ? "M9 5l7 7-7 7" : "M15 19l-7-7 7-7"} />
            </svg>
          </button>
          <button
            onClick={() => setIsMobileOpen(false)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <ul className="space-y-2 md:space-y-4 px-3">
          <li>
            <Link
              href="/admin"
              className={`flex items-center ${isCollapsed ? 'justify-center p-3' : 'p-3'} text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors dark:text-slate-200 dark:hover:bg-slate-800 dark:hover:text-blue-300`}
              onClick={() => setIsMobileOpen(false)}
            >
            <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              {!isCollapsed && <span className={`ml-3 ${isMobileOpen ? 'inline' : 'hidden'} md:inline`}>Dashboard</span>}
            </Link>
          </li>
          <li>
            <Link
              href="/admin/orders"
              className={`flex items-center ${isCollapsed ? 'justify-center p-3' : 'p-3'} text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors dark:text-slate-200 dark:hover:bg-slate-800 dark:hover:text-blue-300`}
              onClick={() => setIsMobileOpen(false)}
            >
            <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {!isCollapsed && <span className={`ml-3 ${isMobileOpen ? 'inline' : 'hidden'} md:inline`}>See Orders</span>}
            </Link>
          </li>
          <li>
            <Link
              href="/admin/customers"
              className={`flex items-center ${isCollapsed ? 'justify-center p-3' : 'p-3'} text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors dark:text-slate-200 dark:hover:bg-slate-800 dark:hover:text-blue-300`}
              onClick={() => setIsMobileOpen(false)}
            >
            <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
              {!isCollapsed && <span className={`ml-3 ${isMobileOpen ? 'inline' : 'hidden'} md:inline`}>See Customers</span>}
            </Link>
          </li>
          <li>
            <Link
              href="/admin/menus"
              className={`flex items-center ${isCollapsed ? 'justify-center p-3' : 'p-3'} text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors dark:text-slate-200 dark:hover:bg-slate-800 dark:hover:text-blue-300`}
              onClick={() => setIsMobileOpen(false)}
            >
              <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              {!isCollapsed && <span className={`ml-3 ${isMobileOpen ? 'inline' : 'hidden'} md:inline`}>My Menus</span>}
            </Link>
          </li>
          <li>
            <Link
              href="/admin/createmenu"
              className={`flex items-center ${isCollapsed ? 'justify-center p-3' : 'p-3'} text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors dark:text-slate-200 dark:hover:bg-slate-800 dark:hover:text-blue-300`}
              onClick={() => setIsMobileOpen(false)}
            >
            <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              {!isCollapsed && <span className={`ml-3 ${isMobileOpen ? 'inline' : 'hidden'} md:inline`}>Create New Menu</span>}
            </Link>
          </li>
        </ul>

        <div className={`${isCollapsed ? 'px-3' : 'px-3 md:px-6'} mt-8 md:mt-12`}>
          <button className={`w-full ${isCollapsed ? 'p-3' : 'py-3 px-4'} bg-red-500 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors flex items-center justify-center`}>
            <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            {!isCollapsed && <span className={`ml-2 ${isMobileOpen ? 'inline' : 'hidden'} md:inline`}>Logout</span>}
          </button>
        </div>
      </div>
    </>
  );
}

export default SideBar;
