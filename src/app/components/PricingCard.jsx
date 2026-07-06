"use client";

import React, { useState } from "react";
import LoginModal from "../components/LoginModal";
import SignupModal from "../components/SignupModal";

export default function PricingCard() {
  const [showAuth, setShowAuth] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  // Credits & Pricing
  const plans = {
    120: 460,
    250: 899,
    500: 1499,
  };

  const [credits, setCredits] = useState("120");

  return (
    <>
      <div className="flex items-center justify-center p-6">
        <div className="w-full max-w-lg rounded-[32px] border border-indigo-100 bg-white p-8 sm:p-10 shadow-[0_8px_20px_rgba(99,102,241,0.18)]">
          
          {/* Header */}
          <div className="flex items-center justify-between">
            <h3 className="text-3xl font-bold text-black">Pro</h3>

            <span className="rounded-full bg-indigo-50 px-3 py-1 text-md font-semibold text-indigo-600">
              Most Popular
            </span>
          </div>

          {/* Dynamic Pricing */}
          <div className="mt-4 flex items-baseline text-black">
            <span className="text-6xl font-bold tracking-tight">
              ₹{plans[credits]}
            </span>

            <span className="ml-2 text-lg font-medium text-gray-400">
              per month
            </span>
          </div>

          {/* Upgrade Button */}
          <button
            onClick={() => setShowAuth(true)}
            className="mt-6 w-full rounded-3xl bg-indigo-600 py-3 text-center text-base font-semibold text-white shadow-md transition duration-200 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2"
          >
            Upgrade
          </button>

          {/* Credits Selector */}
          <div className="relative mt-4">
            <select
              value={credits}
              onChange={(e) => setCredits(e.target.value)}
              className="w-full appearance-none rounded-xl border border-gray-200 bg-white px-4 py-3.5 pr-10 text-base font-medium text-black outline-none focus:border-gray-400"
            >
              <option value="120">120 credits / month</option>
              <option value="250">250 credits / month</option>
              <option value="500">500 credits / month</option>
            </select>

            <div className="pointer-events-none absolute inset-y-0 right-4 flex flex-col justify-center gap-0.5 text-gray-400">
              <svg
                className="h-2.5 w-2.5"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="3"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 15.75l7.5-7.5 7.5 7.5"
                />
              </svg>

              <svg
                className="h-2.5 w-2.5"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="3"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                />
              </svg>
            </div>
          </div>

          {/* Footer Text */}
          <div className="mt-4 text-center text-[13px] text-gray-400">
            <p>Secured payment • UPI, Cards, Net Banking accepted</p>

            <button className="mt-1.5 font-medium text-gray-500 underline transition hover:text-gray-700">
              Want to pay in USD?
            </button>
          </div>

          <hr className="my-6 border-gray-100" />

          {/* Features */}
          <div>
            <h4 className="text-md font-bold text-black">
              All features in Free, plus:
            </h4>

            <ul className="mt-4 space-y-3.5">
              {[
                `${credits} monthly credits`,
                "3 daily credits (up to 90/month)",
                "All tools included",
                "Priority processing",
                "Priority support",
              ].map((feature, index) => (
                <li
                  key={index}
                  className="flex items-center gap-3 text-md font-medium text-gray-600"
                >
                  <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-indigo-50">
                    <svg
                      className="h-3 w-3 text-indigo-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="3.5"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.5 12.75l6 6 9-13.5"
                      />
                    </svg>
                  </div>

                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Auth Choice Modal */}
      {showAuth && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-[32px] bg-white p-8 shadow-2xl">
            <h2 className="text-center text-3xl font-bold text-gray-900">
              Continue to Upgrade
            </h2>

            <p className="mt-2 text-center text-gray-500">
              Please sign in or create an account to continue.
            </p>

            <div className="mt-8 space-y-3">
              <button
                onClick={() => {
                  setShowAuth(false);
                  setShowLogin(true);
                }}
                className="w-full h-12 rounded-2xl border border-gray-300 font-semibold hover:bg-gray-50"
              >
                Log In
              </button>

              <button
                onClick={() => {
                  setShowAuth(false);
                  setShowSignup(true);
                }}
                className="w-full h-12 rounded-2xl bg-indigo-600 font-semibold text-white hover:bg-indigo-700"
              >
                Create Account
              </button>
            </div>

            <button
              onClick={() => setShowAuth(false)}
              className="mt-4 w-full text-sm text-gray-500 hover:text-gray-700"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Login Modal */}
      {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}

      {/* Signup Modal */}
      {showSignup && <SignupModal onClose={() => setShowSignup(false)} />}
    </>
  );
}