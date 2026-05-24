import {
  createSlice,
} from "@reduxjs/toolkit";

const initialState = {

  customers: [],

  currentPage: 1,

  totalPages: 1,
};

const customerSlice =
createSlice({

  name: "customers",

  initialState,

  reducers: {

    setCustomers: (
      state,
      action
    ) => {

      state.customers =
        action.payload.customers;

      state.currentPage =
        action.payload.currentPage;

      state.totalPages =
        action.payload.totalPages;
    },



    addCustomer: (
      state,
      action
    ) => {

      state.customers.push(
        action.payload
      );
    },
  },
});

export const {
  setCustomers,
  addCustomer,
} = customerSlice.actions;

export default
customerSlice.reducer;