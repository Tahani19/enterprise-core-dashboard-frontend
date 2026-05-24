import { useState } from "react";

import DashboardLayout from "../layouts/DashboardLayout";

const SettingsPage = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);

    document.documentElement.classList.toggle("dark");
  };

  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-8">Settings</h1>

      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Dark Mode</h2>

          <button
            onClick={toggleDarkMode}
            className="bg-indigo-600 text-white px-5 py-2 rounded-xl"
          >
            Toggle
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SettingsPage;
