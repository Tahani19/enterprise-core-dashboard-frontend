import { useEffect, useState } from "react";
import DashboardLayout from "../../../layouts/DashboardLayout";

const SettingsPage = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [emailNotif, setEmailNotif] = useState(true);
  const [language, setLanguage] = useState("English");

  // Load saved theme
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  // Toggle Dark Mode
  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    if (newMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto px-4 py-8 text-slate-800 dark:text-slate-100 transition-colors duration-300">
        {/* Header */}
        <div className="mb-8 border-b border-slate-100 dark:border-slate-800 pb-6">
          <h1 className="text-3xl font-extrabold tracking-tight dark: text-black">
            Settings
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1 text-sm">
            Manage your ERP preferences and security settings.
          </p>
        </div>

        <div className="space-y-6">
          {/* Account & Preferences Card */}
          <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl p-6 shadow-sm transition-all">
            <h2 className="text-xl font-bold mb-6 text-slate-900 dark:text-white">
              Account Settings
            </h2>

            <div className="divide-y divide-slate-100 dark:divide-slate-800 space-y-6">
              {/* Dark Mode */}
              <div className="flex justify-between items-center pt-0">
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-slate-100">
                    Dark Mode
                  </h3>
                  <p className="text-slate-500 dark:text-slate-400 text-sm">
                    Enable dark theme across the dashboard
                  </p>
                </div>
                <button
                  onClick={toggleDarkMode}
                  type="button"
                  className={`relative inline-flex h-7 w-12 items-center rounded-full p-1 transition-colors duration-300 focus:outline-none ${
                    darkMode
                      ? "bg-indigo-600"
                      : "bg-slate-200 dark:bg-slate-700"
                  }`}
                >
                  <span
                    className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-sm transition-transform duration-300 ${
                      darkMode ? "translate-x-5" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>

              {/* Notifications */}
              <div className="flex justify-between items-center pt-6">
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-slate-100">
                    Email Notifications
                  </h3>
                  <p className="text-slate-500 dark:text-slate-400 text-sm">
                    Receive system updates and status emails
                  </p>
                </div>
                <button
                  onClick={() => setEmailNotif(!emailNotif)}
                  type="button"
                  className={`relative inline-flex h-7 w-12 items-center rounded-full p-1 transition-colors duration-300 focus:outline-none ${
                    emailNotif
                      ? "bg-emerald-500"
                      : "bg-slate-200 dark:bg-slate-700"
                  }`}
                >
                  <span
                    className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-sm transition-transform duration-300 ${
                      emailNotif ? "translate-x-5" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Language Card */}
          <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl p-6 shadow-sm transition-all">
            <h2 className="text-xl font-bold mb-2 text-slate-900 dark:text-white">
              Language
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm mb-4">
              Select your preferred display language
            </p>

            <div className="relative max-w-xs">
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-3 rounded-xl appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium text-sm transition-all"
              >
                <option>English</option>
                <option>Arabic</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-500">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Security & Access Card */}
          <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl p-6 shadow-sm transition-all">
            <h2 className="text-xl font-bold mb-6 text-slate-900 dark:text-white">
              Security & Access
            </h2>

            <div className="divide-y divide-slate-100 dark:divide-slate-800 space-y-6">
              {/* Two Factor Auth */}
              <div className="flex justify-between items-center pt-0">
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-slate-100">
                    Two Factor Authentication
                  </h3>
                  <p className="text-slate-500 dark:text-slate-400 text-sm">
                    Add an extra layer of protection to your account
                  </p>
                </div>
                <button className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-sm transition-colors duration-200">
                  Enable
                </button>
              </div>

              {/* Active Sessions */}
              <div className="flex justify-between items-center pt-6">
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-slate-100">
                    Active Sessions
                  </h3>
                  <p className="text-slate-500 dark:text-slate-400 text-sm">
                    Monitor and manage your currently logged-in devices
                  </p>
                </div>
                <button className="px-4 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl transition-colors duration-200">
                  View Devices
                </button>
              </div>

              {/* Quick Actions */}
              <div className="pt-6">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                  Account Control
                </h4>
                <div className="flex flex-wrap gap-3">
                  <button
                    type="button"
                    className="px-4 py-2.5 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl transition-colors duration-200 focus:outline-none"
                  >
                    Change Password
                  </button>
                  <button
                    type="button"
                    className="px-4 py-2.5 text-xs font-semibold text-red-600 bg-red-50 dark:bg-red-950/30 hover:bg-red-100 dark:hover:bg-red-950/50 rounded-xl transition-colors duration-200 focus:outline-none"
                  >
                    Logout All Devices
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SettingsPage;
