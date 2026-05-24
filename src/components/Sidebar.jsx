import {
  LayoutDashboard,
  Users,
  Package,
  ShoppingCart,
  FileBarChart,
  Settings,
  User,
  X,
  ChevronRight,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = ({ isOpen, setIsOpen }) => {
  const location = useLocation();

  const menuItems = [
    {
      path: "/dashboard",
      label: "Dashboard",
      icon: <LayoutDashboard size={18} />,
    },
    { path: "/employees", label: "Employees", icon: <Users size={18} /> },
    { path: "/inventory", label: "Inventory", icon: <Package size={18} /> },
    { path: "/sales", label: "Sales", icon: <ShoppingCart size={18} /> },
    { path: "/reports", label: "Reports", icon: <FileBarChart size={18} /> },
    { path: "/profile", label: "Profile", icon: <User size={18} /> }, // تصحيح الأيقونة هنا إلى User
    { path: "/settings", label: "Settings", icon: <Settings size={18} /> },
  ];

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 md:hidden transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        className={`
          fixed md:sticky top-0 left-0 h-screen w-[260px] z-50
          bg-slate-50 dark:bg-[#111827] 
          border-r border-slate-200/60 dark:border-slate-800/60
          p-6 flex flex-col justify-between
          transition-all duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        <div className="w-full">
          <div className="flex items-center justify-between mb-10 pb-2 border-b border-slate-200/40 dark:border-slate-800/40">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-2xl bg-indigo-600 flex items-center justify-center text-white font-black text-sm shadow-md shadow-indigo-500/20">
                TA
              </div>
              <span className="text-base font-bold text-slate-900 dark:text-white tracking-tight">
                Management
              </span>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="md:hidden p-1.5 rounded-xl hover:bg-slate-200/60 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400"
            >
              <X size={18} />
            </button>
          </div>

          <nav className="flex flex-col gap-2">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`
                    flex items-center justify-between p-3 rounded-2xl
                    text-sm font-semibold transition-all duration-200 group
                    ${
                      isActive
                        ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/10 dark:shadow-none"
                        : "text-slate-500 dark:text-slate-400 hover:bg-slate-200/40 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-slate-100"
                    }
                  `}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`transition-colors ${isActive ? "text-white" : "text-slate-400 dark:text-slate-500 group-hover:text-indigo-600 dark:group-hover:text-indigo-400"}`}
                    >
                      {item.icon}
                    </span>
                    <span>{item.label}</span>
                  </div>

                  {!isActive && (
                    <ChevronRight
                      size={14}
                      className="text-slate-300 dark:text-slate-600 opacity-0 group-hover:opacity-100 transition-all transform translate-x-[-4px] group-hover:translate-x-0"
                    />
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="pt-4 border-t border-slate-200/40 dark:border-slate-800/40 text-center">
          <p className="text-[10px] font-bold tracking-widest text-slate-400 dark:text-slate-600 uppercase">
            v2.4.0 • Stable Grid
          </p>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
