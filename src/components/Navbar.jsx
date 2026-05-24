import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Moon, Sun, LogOut, Search, Command, Menu } from "lucide-react";
import { logout } from "../features/auth/authSlice";

const Navbar = ({ isOpen, setIsOpen }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const [isDark, setIsDark] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      return savedTheme === "dark";
    }
    return document.documentElement.classList.contains("dark");
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  const logoutHandler = () => {
    dispatch(logout());
    navigate("/login");
  };

  const toggleDarkMode = () => {
    setIsDark((prev) => !prev);
  };

  const userInfo = JSON.parse(localStorage.getItem("userInfo")) || null;

  const searchHandler = (e) => {
    if (e.key === "Enter") {
      const value = search.toLowerCase().trim();
      const routes = {
        employee: "/employees",
        sale: "/sales",
        inventory: "/inventory",
        customer: "/customers",
        report: "/reports",
        profile: "/profile",
        setting: "/settings",
      };

      const matchedRoute = Object.keys(routes).find((key) =>
        value.includes(key),
      );
      if (matchedRoute) {
        navigate(routes[matchedRoute]);
        setSearch("");
      }
    }
  };

  return (
    <header className="h-[76px] flex items-center justify-between px-4 sm:px-6 md:px-8 w-full bg-white dark:bg-[#111827] border-b border-slate-200/60 dark:border-slate-800/60 transition-colors duration-300 sticky top-0 z-40">
      <div className="flex items-center gap-3">
        <button
          onClick={() => setIsOpen(!isOpen)}
          type="button"
          className="p-2 rounded-xl text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 md:hidden focus:outline-none transition-all"
          aria-label="Toggle Sidebar"
        >
          <Menu size={20} />
        </button>

        <div>
          <h2 className="text-lg font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-1.5">
            <span className="md:hidden w-2 h-2 rounded-full bg-indigo-600 block"></span>
            Enterprise{" "}
          </h2>
        </div>
      </div>

      <div className="relative hidden md:block">
        <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-400 dark:text-slate-500">
          <Search size={16} />
        </span>
        <input
          type="text"
          placeholder="Search modules (e.g., profile, sales)..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={searchHandler}
          className="w-[240px] lg:w-[320px] bg-slate-50 dark:bg-[#161f32] border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 rounded-xl pl-10 pr-10 py-2 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
        />
        <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-slate-300 dark:text-slate-600">
          <Command size={12} />
        </span>
      </div>

      <div className="flex items-center gap-2 sm:gap-3.5 border-l border-slate-200 dark:border-slate-800 pl-3 sm:pl-6">
        <button
          onClick={toggleDarkMode}
          type="button"
          className="p-2 rounded-xl text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:text-slate-800 dark:hover:text-slate-200 transition-all focus:outline-none"
          title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
        >
          {isDark ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        <button
          onClick={logoutHandler}
          type="button"
          className="p-2 rounded-xl text-slate-400 hover:text-rose-500 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/20 transition-all focus:outline-none"
          title="Secure Logout"
        >
          <LogOut size={18} />
        </button>

        <div className="relative ml-0.5 flex-shrink-0">
          <img
            onClick={() => navigate("/profile")}
            src={
              userInfo?.image
                ? `http://localhost:5000/${userInfo.image}`
                : "https://i.pravatar.cc/150"
            }
            alt="User Profile"
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl object-cover cursor-pointer ring-2 ring-slate-200 dark:ring-slate-800 hover:ring-indigo-500 dark:hover:ring-indigo-400 transition-all shadow-sm"
          />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
