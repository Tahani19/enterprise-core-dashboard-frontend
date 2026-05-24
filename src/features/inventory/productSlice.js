import { createSlice }
from "@reduxjs/toolkit";

const initialState = {

  products: [],

  currentPage: 1,

  totalPages: 1,

  totalProducts: 0,
};

const productSlice = createSlice({
  name: "products",

  initialState,

  reducers: {

  setProducts: (
  state,
  action
) => {

  state.products =
    action.payload.products;

  state.currentPage =
    action.payload.currentPage;

  state.totalPages =
    action.payload.totalPages;

  state.totalProducts =
    action.payload.totalProducts;
},



    addProduct: (
      state,
      action
    ) => {
      state.products.push(
        action.payload
      );
    },



    updateProductState: (
      state,
      action
    ) => {

      state.products =
        state.products.map(
          (product) =>

            product._id ===
            action.payload._id
              ? action.payload
              : product
        );
    },



    deleteProductState: (
      state,
      action
    ) => {

      state.products =
        state.products.filter(
          (product) =>
            product._id !==
            action.payload
        );
    },
  },
});

export const {
  setProducts,
  addProduct,
  updateProductState,
  deleteProductState,
} = productSlice.actions;

export default productSlice.reducer;