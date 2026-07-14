"use client";

import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { IoClose, IoEyeOutline } from "react-icons/io5";

export default function SignupModal({ onClose, openLogin }) {
  // --- NEW: state for form fields ---
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // --- NEW: submit handler ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        onClose(); // close modal, or redirect to login/dashboard
      } else {
        setError(data.error || "Something went wrong");
      }
    } catch (err) {
      setError("Network error, please try again");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="relative w-full max-w-md sm:max-w-md bg-white rounded-3xl shadow-2xl max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 h-10 w-10 rounded-2xl border-2 border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50"
        >
          <IoClose size={22} />
        </button>

        <div className="px-5 sm:px-8 py-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-900">
            Create your account
          </h2>

          <p className="text-center text-gray-500 mt-2 text-sm">
            Welcome! Please fill in the details to get started.
          </p>

          <a
            href="/api/auth/google"
            className="mt-6 flex items-center justify-center gap-3 h-12 rounded-xl border border-gray-300 hover:bg-gray-50 transition"
          >
            <FcGoogle className="text-2xl" />
            Continue with Google
          </a>

          <div className="flex items-center gap-4 my-5">
            <div className="flex-1 h-px bg-gray-300"></div>
            <span className="text-gray-500 text-sm">or</span>
            <div className="flex-1 h-px bg-gray-300"></div>
          </div>

          {/* --- NEW: wrapped inputs in a <form> and connected them --- */}
          <form onSubmit={handleSubmit}>
            {/* --- NEW: error message --- */}
            {error && (
              <p className="text-red-500 text-sm text-center mb-3">{error}</p>
            )}

            <input
              type="text"
              placeholder="Enter Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full mb-4 h-12 px-5 rounded-2xl border border-gray-300 outline-none focus:border-black"
            />

            <input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full h-12 px-5 rounded-2xl border border-gray-300 outline-none focus:border-black"
            />

            <div className="relative mt-4">
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

            <button
              type="submit"
              disabled={loading}
              className="w-full h-12 mt-6 rounded-2xl bg-black text-white font-semibold hover:bg-gray-900 disabled:opacity-50"
            >
              {loading ? "Please wait..." : "Continue →"}
            </button>
          </form>
        </div>
        <div className="border-t border-gray-200 py-4 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <span
            onClick={openLogin}
            className="font-semibold text-black cursor-pointer hover:underline"
          >
            Log in
          </span>
        </div>
      </div>
    </div>
  );
}
