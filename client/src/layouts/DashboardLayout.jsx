import { useState } from "react";
import { Outlet } from "react-router";
import Sidebar from "../Components/dashboard/Sidebar";
import { FaBars } from "react-icons/fa"; // Toggle icon

function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <section className="flex min-h-screen relative">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content */}
      <div className="flex-1 bg-gray-100">
        {/* Top bar */}
        <div className="py-5 w-full bg-white shadow px-4 flex items-center justify-end lg:justify-end">
          {/* Toggle Button for All Screens */}
          <button
            className="text-xl mr-4 lg:mr-6"
            onClick={() => setSidebarOpen((prev) => !prev)}
          >
            <FaBars />
          </button>
          <h1 className="text-xl font-semibold">Dashboard</h1>
        </div>

        <div className="p-6">
          <Outlet />
        </div>
      </div>
    </section>
  );
}

export default DashboardLayout;
