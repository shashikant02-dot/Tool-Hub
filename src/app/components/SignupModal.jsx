"use client";

import { FcGoogle } from "react-icons/fc";
import { IoClose, IoEyeOutline } from "react-icons/io5";

export default function SignupModal({ onClose }) {
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
            Create your account
          </h2>

          <p className="text-center text-gray-500 mt-2 text-sm">
            Welcome! Please fill in the details to get started.
          </p>

          <button className="mt-6 w-full h-12 border border-gray-300 rounded-2xl flex items-center justify-center gap-3 text-gray-700 font-medium hover:bg-gray-50">
            <FcGoogle size={22} />
            Continue with Google
          </button>

          <div className="flex items-center gap-4 my-5">
            <div className="flex-1 h-px bg-gray-300"></div>
            <span className="text-gray-500 text-sm">or</span>
            <div className="flex-1 h-px bg-gray-300"></div>
          </div>


 <input
            type="text"
            placeholder="Enter Your Name"
            className="w-full mb-4 h-12 px-5 rounded-2xl border border-gray-300 outline-none focus:border-black"
          />

          <input
            type="email"
            placeholder="Enter your email address"
            className="w-full h-12 px-5 rounded-2xl border border-gray-300 outline-none focus:border-black"
          />

          <div className="relative mt-4">
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full h-12 px-5 pr-12 rounded-2xl border border-gray-300 outline-none focus:border-black"
            />

            <IoEyeOutline className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500" />
          </div>

          <button className="w-full h-12 mt-6 rounded-2xl bg-black text-white font-semibold hover:bg-gray-900">
            Continue →
          </button>

        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 py-4 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <span className="font-semibold text-black cursor-pointer">
            Sign in
          </span>
        </div>

      </div>
    </div>
  );
}