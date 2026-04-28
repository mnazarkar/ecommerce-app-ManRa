
import { useEffect, useState } from "react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../actions/authActions";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";

const LoginModal = ({ onClose }: { onClose: () => void }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();


  // error state
  const [errors, setErrors] = useState<{
    username?: string;
    password?: string;
  }>({});

  const dispatch = useDispatch<any>();
  const authState = useSelector((state: any) => state.auth);

  // Fill Passsword for easier testing
  const fillTestCredentials = () => {
    setUsername("emilys");
    setPassword("emilyspass");
    setErrors({});
  }

  useEffect(() => {
    // clear errors on auth change (e.g. after successful login)
    if (authState.isAuthenticated) {
      setPassword("");
      setUsername("");
      setErrors({});
    }
  }, [authState.isAuthenticated]);

  // validation function
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

    await dispatch(login(username, password, navigate));
  };
  return (
    <div className="fixed inset-0 w-full h-full bg-black/50 backdrop-blur flex items-center justify-center z-200 px-4" onClick={onClose}>
      <div className="min-w-[50%] min-h-[50%] mx-auto bg-white shadow-md p-6 rounded-lg flex flex-col justify-between items-center" onClick={(e) => e.stopPropagation()}>
        <h2 className="text-xl font-bold mb-4">Login</h2>
        <h4 className="text-lg font-semibold mb-4">Please enter your credentials</h4>

        <div className="bg-linear-to-t from-sky-500 to-indigo-500 p-2 rounded text-white mb-4 flex items-center justify-center gap-4 lg:gap-6 w-full">
          You are logging into a simulated environment. To proceed, click ’Fill’ to autofill the test login credentials.
          <button
            type="button"
            className="text-purple-900 cursor-pointer ml-2 underline"
            onClick={fillTestCredentials}
          >
            Fill
          </button>
        </div>

        {authState.error && (
          <div className="text-red-500 text-sm mb-4 flex items-center justify-center">
            Login failed. Please Try Again!!
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
          {/* Username */}
          <div>
            <input
              type="text"
              placeholder="Username"
              className={`border p-2 rounded w-full ${errors.username ? "border-red-500" : ""
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
          <div>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className={`border p-2 rounded w-full pr-10 ${errors.password ? "border-red-500" : ""
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
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password}
              </p>
            )}
          </div>

          {/* Button */}
          <button
            className='py-2 rounded text-white cursor-pointer bg-linear-to-bl from-violet-500 to-fuchsia-500'
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;