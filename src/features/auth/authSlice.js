import { createSlice } from "@reduxjs/toolkit";

const userFromStorage = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;

const initialState = {
  user: userFromStorage,
};

/*const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    setCredentials: (state, action) => {
      state.user = action.payload;

      localStorage.setItem(
        "user",
        JSON.stringify(action.payload)
      );
    },

    logout: (state) => {
      state.user = null;

      localStorage.removeItem("user");
    },
  },
});
*/
const authSlice = createSlice({
  name: "auth",

  initialState: {
    userInfo:
      localStorage.getItem(
        "userInfo"
      )
        ? JSON.parse(
            localStorage.getItem(
              "userInfo"
            )
          )
        : null,
  },

  reducers: {

    setCredentials:
      (state, action) => {

        state.userInfo =
          action.payload;

        localStorage.setItem(
          "userInfo",
          JSON.stringify(
            action.payload
          )
        );
      },

    logout: (state) => {

      state.userInfo = null;

      localStorage.removeItem(
        "userInfo"
      );
    },
  },
});
export const {
  setCredentials,
  logout,
} = authSlice.actions;

export default authSlice.reducer;