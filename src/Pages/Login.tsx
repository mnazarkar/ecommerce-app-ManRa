import { useEffect, useState } from "react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../actions/authActions";
import { Eye, EyeOff } from "lucide-react";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // 🔥 error state
  const [errors, setErrors] = useState<{
    username?: string;
    password?: string;
  }>({});

  const dispatch = useDispatch<any>();
  const authState = useSelector((state: any) => state.auth);

  useEffect(() => {
    // ✅ clear errors on auth change (e.g. after successful login)
    if (authState.isAuthenticated) {
      setPassword("");
      setUsername("");
      setErrors({});
    }
  }, [authState.isAuthenticated]);

  // ✅ validation function
  const validate = () => {
    const newErrors: any = {};

    if (!username.trim()) {
      newErrors.username = "Username is required";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validate()) return;

    await dispatch(login(username, password));
  };

  // ✅ disable button logic
  const isFormValid =
    username.trim().length > 0 && password.length >= 6;

  const getFormView = () => {
    return (
      <div className="max-w-md mx-auto bg-white shadow-md p-6 rounded-lg">
        <h2 className="text-xl font-bold mb-4">Login</h2>
        <h4 className="text-lg font-semibold mb-4">Please enter your credentials</h4>

        {authState.error && (
          <div className="text-red-500 text-sm mb-4 flex items-center justify-center w-full">
            Login failed. Please Try Again!!
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Username */}
          <div>
            <input
              type="text"
              placeholder="Username"
              className={`border p-2 rounded w-full ${
                errors.username ? "border-red-500" : ""
              }`}
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                setErrors((prev) => ({ ...prev, username: "" }));
              }}
            />
            {errors.username && (
              <p className="text-red-500 text-sm mt-1">
                {errors.username}
              </p>
            )}
          </div>

          {/* Password */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className={`border p-2 rounded w-full pr-10 ${
                errors.password ? "border-red-500" : ""
              }`}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setErrors((prev) => ({ ...prev, password: "" }));
              }}
            />

            <span
              className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer"
              onClick={() =>
                setShowPassword((prev) => !prev)
              }
            >
              {showPassword ? (
                <EyeOff size={20} />
              ) : (
                <Eye size={20} />
              )}
            </span>

            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password}
              </p>
            )}
          </div>

          {/* Button */}
          <button
            className='py-2 rounded text-white cursor-pointer bg-black'
          >
            Login
          </button>
        </form>
      </div>
    );
  };

  const getView = () => {
    if (authState.isAuthenticated) {
      return (
        <div className="flex flex-col gap-4 w-full h-full justify-center items-center">
          <div className="w-32 h-32 rounded-full overflow-hidden">
            <img
              src={authState.user.image}
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover"
            />
          </div>
          <div className="text-xl font-bold mb-4">
            Welcome, {authState.user.firstName}!
          </div>
          <button
            className="bg-red-500 text-white p-2 rounded cursor-pointer"
            onClick={() => dispatch(logout())}
          >
            Logout
          </button>
        </div>
      );
    } else {
      return getFormView();
    }
  };

  return getView();
};

export default Login;