"use client";

import { FcGoogle } from "react-icons/fc";
import { IoClose, IoEyeOutline } from "react-icons/io5";

export default function LoginModal({ onClose }) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">

      <div className="relative w-[27vw] max-w-lg max-h-[85vh] overflow-y-auto bg-white rounded-[32px] shadow-2xl">

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 h-10 w-10 rounded-2xl border-2 border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50"
        >
          <IoClose size={22} />
        </button>

        {/* Content */}
        <div className="px-8 pt-8 pb-6">

          <h2 className="text-3xl font-bold text-center text-gray-900">
Sign in to ToolHub          </h2>

          <p className="text-center text-gray-500 mt-2 text-sm">
Welcome back! Please sign in to continue

          </p>

          {/* Google Button */}
          <button className="mt-6 w-full h-12 border border-gray-300 rounded-2xl flex items-center justify-center gap-3 text-gray-700 font-medium hover:bg-gray-50 transition">
            <FcGoogle size={22} />
            Continue with Google
          </button>

          {/* Divider */}
          <div className="flex items-center gap-4 my-5">
            <div className="flex-1 h-px bg-gray-300"></div>
            <span className="text-gray-500 text-sm">or</span>
            <div className="flex-1 h-px bg-gray-300"></div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-2">
              Email address
            </label>

            <input
              type="email"
              placeholder="Enter your email address"
              className="w-full h-12 px-5 rounded-2xl border border-gray-300 outline-none focus:border-black"
            />
          </div>

          {/* Password */}
          <div className="mt-4">
            

            <div className="relative">
              

            </div>
          </div>

          {/* Continue Button */}
          <button className="w-full h-12 mt-6 rounded-2xl bg-black text-white font-semibold text-base hover:bg-gray-900 transition">
            Continue →
          </button>

        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 py-4">
          <p className="text-center text-gray-600 text-sm">
            Don’t have an account?{" "}
            <span className="font-semibold text-black cursor-pointer">
              Sign up
            </span>
          </p>
        </div>

        {/* Clerk Footer
        <div className="bg-gray-50 border-t border-gray-200 py-4">
          <p className="text-center text-gray-500 text-sm font-medium">
            Secured by <span className="font-bold">clerk</span>
          </p>
        </div> */}

      </div>
    </div>
  );
}