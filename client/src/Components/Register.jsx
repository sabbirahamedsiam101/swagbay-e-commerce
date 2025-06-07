import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { useRegisterMutation } from "../redux/features/auth/authApi";
import toast from "react-hot-toast";

function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const [register, { isLoading: registerLoading, error }] =
    useRegisterMutation();
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage("");

    const formData = e.target;
    const name = formData.name.value.trim();
    const email = formData.email.value.trim();
    const password = formData.password.value;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Validation
    if (!emailRegex.test(email)) {
      setMessage("Please enter a valid email address.");
      return;
    }

    if (password.length < 6) {
      setMessage("Password must be at least 6 characters long.");
      return;
    }

    const user = { name, email, password };

    try {
      const response = await register(user).unwrap();
      console.log("Registered successfully:", response);
      if (response?.user) {
        toast.success("Registration successful!");
        navigate("/login");
      }
      setMessage("Registration successful!");
    } catch (err) {
      console.error("Registration failed", err);
      toast.error(err?.data?.message || "Registration failed");
      setMessage(err?.data?.message || "Registration failed");
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 space-y-6">
        <h2 className="text-3xl font-bold text-center text-gray-800">
          Create Your Account
        </h2>
        <form onSubmit={handleRegister} className="space-y-5">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Full Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              required
              placeholder="Your Name"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

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
            >
              {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
            </button>
          </div>

          {message && <p className="text-red-500 text-sm">{message}</p>}

          <button
            type="submit"
            disabled={registerLoading}
            className={`w-full py-3 font-semibold rounded-lg text-white transition-all duration-300 ${
              registerLoading
                ? "bg-indigo-300 cursor-not-allowed"
                : "bg-primary hover:bg-indigo-700"
            }`}
          >
            {registerLoading ? "Creating account..." : "Register"}
          </button>
        </form>

        <div className="text-sm text-center text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-primary font-medium hover:underline"
          >
            Login here
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Register;
