"use client";

import React, { useState, useEffect } from "react";
import LoginModal from "../components/LoginModal";
import SignupModal from "../components/SignupModal";

export default function PricingCard() {
  const [showAuth, setShowAuth] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [subscribing, setSubscribing] = useState(false);

  const checkAuth = async () => {
    try {
      const res = await fetch("/api/auth/me", {
        credentials: "include",
        cache: "no-store",
      });

      const data = await res.json();

      const loggedIn = !!data.user;
      setIsLoggedIn(loggedIn);

      return loggedIn;
    } catch (err) {
      console.error(err);
      setIsLoggedIn(false);
      return false;
    }
  };
  useEffect(() => {
    checkAuth();
  }, []);
  const plans = {
    120: 460,
    250: 899,
    500: 1499,
  };

  const [credits, setCredits] = useState("120");
  const handleUpgradeClick = () => {
    if (!isLoggedIn) {
      setShowAuth(true);
      return;
    }

    startSubscription();
  };
  const startSubscription = async () => {
    setSubscribing(true);

    try {
      console.log(
        `Starting subscription for ${credits} credits (₹${plans[credits]})`,
      );

      const res = await fetch("/api/payment/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: plans[credits],
        }),
      });

      const data = await res.json();

      console.log("Order Data:", data);

      if (!data.order) {
        throw new Error("Order creation failed");
      }

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,

        amount: data.order.amount,

        currency: "INR",

        name: "ToolHub",

        description: `${credits} Credits Plan`,

        order_id: data.order.id,

        handler: async function (response) {
          console.log("Payment Success:", response);

          try {
            const verifyRes = await fetch("/api/payment/verify", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                credits: Number(credits),
              }),
            });

            const verifyData = await verifyRes.json();

            if (!verifyRes.ok || !verifyData.success) {
              throw new Error(verifyData.error || "Verification failed");
            }

            // 🔔 Let the rest of the site (limit popup, header, etc.) know
            // this user is now Pro / unlimited.
            window.dispatchEvent(new Event("authchange"));

            alert("Payment successful! You now have unlimited access for 30 days.");
          } catch (err) {
            console.error("Verification Error:", err);
            alert(
              "Payment received but verification failed. Please contact support with your payment ID: " +
                response.razorpay_payment_id
            );
          }
        },

        prefill: {
          name: "ToolHub User",
          email: "",
        },

        theme: {
          color: "#4f46e5",
        },
      };

      const razorpay = new window.Razorpay(options);

      razorpay.open();
    } catch (error) {
      console.error("Subscription Error:", error);
    } finally {
      setSubscribing(false);
    }
  };

  return (
    <>
      <div className="flex items-center justify-center p-6">
        <div className="w-full max-w-lg rounded-[32px] border border-indigo-100 bg-white p-8 sm:p-10 shadow-[0_8px_20px_rgba(99,102,241,0.18)]">
          <div className="flex items-center justify-between">
            <h3 className="text-3xl font-bold text-black">Pro</h3>
            <span className="rounded-full bg-indigo-50 px-3 py-1 text-md font-semibold text-indigo-600">
              Most Popular
            </span>
          </div>

          <div className="mt-4 flex items-baseline text-black">
            <span className="text-6xl font-bold tracking-tight">
              ₹{plans[credits]}
            </span>
            <span className="ml-2 text-lg font-medium text-gray-400">
              per month
            </span>
          </div>

          <button
            onClick={handleUpgradeClick}
            disabled={subscribing}
            className="mt-6 w-full rounded-3xl bg-indigo-600 py-3 text-center text-base font-semibold text-white shadow-md transition duration-200 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 disabled:opacity-50"
          >
            {subscribing
              ? "Processing..."
              : isLoggedIn
                ? "Upgrade"
                : "Login to Upgrade"}
          </button>

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

          <div className="mt-4 text-center text-[13px] text-gray-400">
            <p>Secured payment • UPI, Cards, Net Banking accepted</p>
            <button className="mt-1.5 font-medium text-gray-500 underline transition hover:text-gray-700">
              Want to pay in USD?
            </button>
          </div>

          <hr className="my-6 border-gray-100" />

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

      {showLogin && (
        <LoginModal
          onClose={() => setShowLogin(false)}
          onLoginSuccess={async () => {
            setShowLogin(false);

            const loggedIn = await checkAuth();

            if (loggedIn) {
              startSubscription();
            }
          }}
        />
      )}
      {showSignup && (
        <SignupModal
          onClose={() => setShowSignup(false)}
          onSignupSuccess={async () => {
            setShowSignup(false);

            const loggedIn = await checkAuth();

            if (loggedIn) {
              startSubscription();
            }
          }}
        />
      )}
    </>
  );
}