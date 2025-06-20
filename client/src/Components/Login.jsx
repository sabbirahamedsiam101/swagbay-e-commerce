import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { FiEye, FiEyeOff, FiArrowLeft } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { setUser } from "../redux/features/auth/authSlice";
import toast from "react-hot-toast";

function Login() {
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const [login, { isLoading: loginLoading }] = useLoginMutation();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    const formData = e.target;
    const email = formData.email.value;
    const password = formData.password.value;
    const userData = { email, password };

    try {
      const res = await login(userData).unwrap();
      const { user } = res;
      dispatch(setUser({ user }));
      toast.success("Login successful!");
      setMessage("Login successful!");
      navigate("/");
    } catch (err) {
      toast.error(err?.data?.message || "Invalid credentials");
      setMessage(err?.data?.message || "Invalid credentials");
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-100 px-4 relative">
      {/* Back Button */}
      <button
        onClick={() => navigate("/")}
        className="absolute top-6 left-6 text-white hover:text-black bg-primary px-5 py-2.5 rounded flex items-center gap-2"
      >
        <FiArrowLeft size={20} />
        <span className="text-sm font-medium">Back to Home</span>
      </button>

      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 space-y-6">
        <h2 className="text-3xl font-bold text-center text-gray-800">
          Login to Your Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email Address
            </label>
            <input
              type="email"
              name="email"
              id="email"
              required
              placeholder="example@mail.com"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div className="relative">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              id="password"
              required
              placeholder="••••••••"
              className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-[38px] text-gray-500 hover:text-gray-700 focus:outline-none"
              aria-label={showPassword ? "Hide password" : "Show password"}
              tabIndex={0}
            >
              {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
            </button>
          </div>

          {message && <p className="text-red-500 text-sm">{message}</p>}

          <button
            type="submit"
            disabled={loginLoading}
            className={`w-full py-3 font-semibold rounded-lg text-white transition-all duration-300 ${
              loginLoading
                ? "bg-indigo-300 cursor-not-allowed"
                : "bg-primary hover:bg-indigo-700"
            }`}
          >
            {loginLoading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="text-sm text-center text-gray-600">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="text-primary font-medium hover:underline"
          >
            Register here
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Login;
