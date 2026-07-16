"use client";

import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { IoClose, IoEyeOutline } from "react-icons/io5";

export default function LoginModal({ onClose, openSignup,onLoginSuccess }) {
  // --- NEW: state for form fields ---
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // --- NEW: submit handler ---
  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Login failed");
        return;
      }

      // Save logged in user
    // Save logged in user
      localStorage.setItem("user", JSON.stringify(data.user));

      // 🔔 NEW: tell the rest of the site (Header, free-usage limit, etc)
      // that the user just logged in, wherever this modal was opened from
      window.dispatchEvent(new Event("authchange"));

      onLoginSuccess?.(data.user);
      alert("Login Successful ✅");

      onClose();
    } catch (err) {
      console.error(err);
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
<div
  className="
  relative
  w-full
  sm:w-[420px]
  md:w-[450px]
  max-w-[95%]
  max-h-[90vh]
  overflow-y-auto
  bg-white
  rounded-[28px]
  shadow-2xl
  "
>
        <button
          onClick={onClose}
          className="absolute top-4 right-4 h-10 w-10 rounded-2xl border-2 border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50"
        >
          <IoClose size={22} />
        </button>

        <div className="px-8 pt-8 pb-6">
          <h2 className="text-3xl font-bold text-center text-gray-900">
            Sign in to ToolHub
          </h2>

          <p className="text-center text-gray-500 mt-2 text-sm">
            Welcome back! Please sign in to continue
          </p>
          <a
            href="/api/auth/google"
            className="flex items-center justify-center gap-2 mt-2 border border-gray-300 rounded-lg py-2 px-4 hover:bg-gray-50"
          >
            <FcGoogle className="text-2xl" />
            Continue with Google
          </a>

          <div className="flex items-center gap-4 my-5">
            <div className="flex-1 h-px bg-gray-300"></div>
            <span className="text-gray-500 text-sm">or</span>
            <div className="flex-1 h-px bg-gray-300"></div>
          </div>

          {/* --- NEW: wrapped everything in a <form>, fixed nesting, connected state --- */}
          <form onSubmit={handleSubmit}>
            {/* --- NEW: error message --- */}
            {error && (
              <p className="text-red-500 text-sm text-center mb-3">{error}</p>
            )}

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-2">
                Email address
              </label>

              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full h-12 px-5 rounded-2xl border border-gray-300 outline-none focus:border-black"
              />
            </div>

            {/* Password — moved out of the email div, into its own block */}
            <div className="mt-4">
              <label className="block text-sm font-semibold text-gray-800 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full h-12 px-5 pr-12 rounded-2xl border border-gray-300 outline-none focus:border-black"
                />
                <IoEyeOutline className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500" />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full h-12 mt-6 rounded-2xl bg-black text-white font-semibold text-base hover:bg-gray-900 transition disabled:opacity-50"
            >
              {loading ? "Please wait..." : "Continue →"}
            </button>
          </form>
        </div>

        <div className="border-t border-gray-200 py-4">
          <p className="text-center text-gray-600 text-sm">
            Don't have an account?{" "}
            <span
              onClick={openSignup}
              className="font-semibold text-black cursor-pointer hover:underline"
            >
              Sign up
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
