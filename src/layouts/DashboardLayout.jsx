import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { useState } from "react";

const DashboardLayout = ({ children }) => {
  // 1. هنا نضع الحالة المشتركة للتحكم في القائمة الجانبية
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-slate-100 dark:bg-[#0f172a] transition-colors duration-300">
      {/* 2. نمرر الحالة ودالة التغيير إلى الـ Sidebar */}
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

      {/* الحاوية الرئيسية للمحتوى والنوافذ */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-y-auto">
        {/* 3. نمرر الحالة ودالة التغيير إلى الـ Navbar لكي يعمل زر الـ Menu */}
        <Navbar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

        {/* مساحة عرض الصفحات الداخلية (مثل صفحة المبيعات والموظفين) */}
        <main className="p-4 sm:p-6 md:p-8 flex-1">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
