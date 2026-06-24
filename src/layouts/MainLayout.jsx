import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import DashboardHeader from "../components/layout/DashboardHeader";
import Sidebar from "../components/layout/Sidebar";
import useIdleLogout from "../services/useIdleLogout";

export default function MainLayout() {
  useIdleLogout();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />

      <div className="flex-1 flex flex-col overflow-auto">
        <DashboardHeader
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        <main className="flex-1 overflow-auto bg-[#F8FAFC]">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
