import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { store } from "./app/store";
const savedTheme =
  localStorage.getItem("theme");

if (savedTheme === "dark") {
  document.documentElement.classList.add(
    "dark"
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
    <Toaster position="top-right" />
  </Provider>
)