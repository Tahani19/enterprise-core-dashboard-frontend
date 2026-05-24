import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  employees: [],
};

const employeeSlice = createSlice({
  name: "employees",

  initialState,

  reducers: {
    setEmployees: (state, action) => {
      state.employees = action.payload;
    },

    addEmployee: (state, action) => {
      state.employees.push(action.payload);
    },

    updateEmployeeState: (state, action) => {
      state.employees = state.employees.map((employee) =>
        employee._id === action.payload._id ? action.payload : employee,
      );
    },

    deleteEmployeeState: (state, action) => {
      state.employees = state.employees.filter(
        (employee) => employee._id !== action.payload,
      );
    },
  },
});

export const {
  setEmployees,
  addEmployee,
  updateEmployeeState,
  deleteEmployeeState,
} = employeeSlice.actions;

export default employeeSlice.reducer;
