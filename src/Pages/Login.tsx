import { useState } from "react";
import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../actions/authActions";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch<any>();
  const authState = useSelector((state: any) => state.auth);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log("Login Data:", { username, password });
    dispatch(login(username, password));
    setPassword(""); // Clear password field after submission
    setUsername(""); // Clear username field after submission
  };

  const getFormView = () => {
      return (
        <div className="max-w-md mx-auto bg-white shadow-md p-6 rounded-lg">
      <h2 className="text-xl font-bold mb-4">Login</h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Username"
          className="border p-2 rounded"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="border p-2 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="bg-black text-white py-2 rounded">
          Login
        </button>
      </form>
    </div>);
  };
  console.log('store', authState);

  const getView = () => {
    if (authState.isAuthenticated) {
      return (
        <div className="flex flex-col gap-4 w-full h-full justify-center items-center">
          <div className="w-32 h-32 rounded-full overflow-hidden">
            <img src={authState.user.image} alt="Profile" className="w-32 h-32 rounded-full object-cover" />
          </div>
          <div className="text-xl font-bold mb-4">Welcome, {authState.user.firstName}!</div>
          <button className="bg-red-500 text-white p-2 rounded cursor-pointer" onClick={() => dispatch(logout())}>
            Logout
          </button>
        </div>
      );
    }else {
      return getFormView();
    }
  };
  

  return (
    getView()
  );
};

export default Login;