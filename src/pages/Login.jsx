import { useState } from "react";
import API from "../services/api";

import { useDispatch } from "react-redux";
import { setCredentials } from "../features/auth/authSlice";

import { useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await API.post(
        "/auth/login",
        formData
      );

      dispatch(setCredentials(data));
localStorage.setItem(
  "token",
  data.token
);
      navigate("/dashboard");

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-lg w-[400px]"
      >
        <h1 className="text-2xl font-bold mb-6">
          Login
        </h1>

        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full border p-3 mb-4 rounded-lg"
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full border p-3 mb-4 rounded-lg"
          onChange={handleChange}
        />

        <button className="w-full bg-indigo-600 text-white p-3 rounded-lg">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;