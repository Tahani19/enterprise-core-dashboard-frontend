import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./routes/ProtectedRoute";
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
        {/* Redirect Root */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* Public */}
        <Route path="/login" element={<Login />} />
        <Route path="/customers" element={<CustomersPage />} />
        <Route
          path="/employees"
          element={
            <ProtectedRoute>
              <EmployeesPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/inventory"
          element={
            <ProtectedRoute>
              <InventoryPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/sales"
          element={
            <ProtectedRoute>
              <SalesPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <SettingsPage />
            </ProtectedRoute>
          }
        />
        <Route path="/register" element={<Register />} />

        {/* Protected */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/reports" element={<ReportsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
