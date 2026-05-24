import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// الاستيرادات الأساسية للصفحات والواجهات
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import EmployeesPage from "./features/employees/pages/EmployeesPage";
import InventoryPage from "./features/inventory/pages/InventoryPage";
import SalesPage from "./features/sales/pages/SalesPage";
import CustomersPage from "./features/customers/pages/CustomersPage";
import ReportsPage from "./features/reports/pages/ReportsPage";
import ProfilePage from "./features/profile/pages/ProfilePage";
import SettingsPage from "./features/settings/pages/SettingsPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />

        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/employees" element={<EmployeesPage />} />
        <Route path="/inventory" element={<InventoryPage />} />
        <Route path="/sales" element={<SalesPage />} />
        <Route path="/customers" element={<CustomersPage />} />
        <Route path="/reports" element={<ReportsPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/settings" element={<SettingsPage />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
