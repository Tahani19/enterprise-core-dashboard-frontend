import { configureStore } from "@reduxjs/toolkit";

import authReducer from "../features/auth/authSlice";

import employeeReducer from "../features/employees/employeeSlice";
import themeReducer
from "../features/theme/themeSlice";
import productReducer
from "../features/inventory/productSlice";
import salesReducer
from "../features/sales/salesSlice";
import dashboardReducer
from "../features/dashboard/dashboardSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    employees: employeeReducer,
    theme: themeReducer,
    products: productReducer,
    sales: salesReducer,
    dashboard : dashboardReducer
  },
});