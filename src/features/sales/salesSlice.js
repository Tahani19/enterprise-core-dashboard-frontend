import {
  createSlice,
} from "@reduxjs/toolkit";

const initialState = {
  orders: [],
};

const salesSlice =
  createSlice({

    name: "sales",

    initialState,

    reducers: {

      setOrders: (
        state,
        action
      ) => {

        state.orders =
          action.payload;
      },

      addOrder: (
        state,
        action
      ) => {

        state.orders.push(
          action.payload
        );
      },
    },
  });

export const {
  setOrders,
  addOrder,
} = salesSlice.actions;

export default
salesSlice.reducer;