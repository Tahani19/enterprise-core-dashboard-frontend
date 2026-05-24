import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { useState } from "react";

const DashboardLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-slate-100 dark:bg-[#0f172a] transition-colors duration-300">
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-y-auto">
        <Navbar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

        <main className="p-4 sm:p-6 md:p-8 flex-1">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
