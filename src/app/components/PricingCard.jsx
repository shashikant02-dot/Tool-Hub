"use client";

import React, { useState, useEffect, useRef } from "react";
import LoginModal from "../components/LoginModal";
import SignupModal from "../components/SignupModal";
import Swal from "sweetalert2";

export default function PricingCard() {
  const [showAuth, setShowAuth] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [subscribing, setSubscribing] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

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

  // close dropdown on outside click
  useEffect(() => {
    const handleClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
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
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                credits: Number(credits),
              }),
            });

            const verifyData = await verifyRes.json();

            if (!verifyRes.ok || !verifyData.success) {
              throw new Error(
                verifyData.error || "Verification failed",
              );
            }

            window.dispatchEvent(new Event("authchange"));

   await Swal.fire({
  icon: "success",
  title: "🎉 Payment Successful",
  html: `
    <div class="payment-popup">
      <h3>Welcome to ToolHub Pro</h3>

      <p>Your Premium plan has been activated successfully.</p>

      <div class="payment-box">
         Unlimited access for <b>30 Days</b>
      </div>
    </div>
  `,
  confirmButtonText: "Start Using",
  confirmButtonColor: "#2563EB",

  width: "90%",
  padding: "2rem",

  customClass: {
    popup: "toolhub-popup",
    title: "toolhub-title",
    confirmButton: "toolhub-btn",
  },
});
          } catch (err) {
            console.error("Verification Error:", err);

           await Swal.fire({
  icon: "error",
  title: "Verification Failed",
  html: `
    <p>Your payment was received but verification failed.</p>

    <br>

    <strong>Payment ID</strong>

    <br>

    <code>${response.razorpay_payment_id}</code>
  `,
  confirmButtonColor: "#EF4444",
  confirmButtonText: "OK",
});
          }
        },

        prefill: {
          name: "ToolHub User",
          email: "",
        },

        theme: {
          color: "#7c3aed",
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

  const creditOptions = [
    { value: "120", label: "120 credits / month" },
    { value: "250", label: "250 credits / month" },
    { value: "500", label: "500 credits / month" },
  ];

  return (
    <>
      {/* ================= PRICING CARD ================= */}

      <div className="flex items-center justify-center p-3 sm:p-6">
        <div
          className="
            w-full
            max-w-lg
            rounded-2xl
            sm:rounded-[32px]
            border
            border-white/10
            bg-white/[0.06]
            p-5
            sm:p-8
            md:p-10
            shadow-[0_0_60px_rgba(139,92,246,0.18)]
            backdrop-blur-xl
          "
        >
          {/* HEADER */}

          <div className="flex flex-wrap items-center justify-between gap-2">
            <h3 className="text-2xl sm:text-3xl font-bold text-white">
              Pro
            </h3>

            <span
              className="
                rounded-full
                border
                border-purple-400/20
                bg-purple-500/10
                px-2.5
                sm:px-3
                py-1
                text-xs
                sm:text-md
                font-semibold
                text-purple-300
                whitespace-nowrap
              "
            >
              Most Popular
            </span>
          </div>

          {/* PRICE */}

          <div className="mt-4 flex flex-wrap items-baseline text-white">
            <span className="text-4xl sm:text-6xl font-bold tracking-tight">
              ₹{plans[credits]}
            </span>

            <span className="ml-2 text-sm sm:text-lg font-medium text-gray-400">
              per month
            </span>
          </div>

          {/* UPGRADE BUTTON */}

          <button
            onClick={handleUpgradeClick}
            disabled={subscribing}
            className="
              mt-6
              w-full
              rounded-2xl
              sm:rounded-3xl
              bg-gradient-to-r
              from-orange-500
              via-pink-500
              to-purple-600
              py-3
              text-center
              text-sm
              sm:text-base
              font-semibold
              text-white
              shadow-lg
              shadow-purple-500/20
              transition
              duration-200
              hover:scale-[1.02]
              hover:shadow-purple-500/40
              focus:outline-none
              focus:ring-2
              focus:ring-purple-500
              focus:ring-offset-2
              focus:ring-offset-[#080808]
              disabled:opacity-50
            "
          >
            {subscribing
              ? "Processing..."
              : isLoggedIn
                ? "Upgrade Now"
                : "Login to Upgrade"}
          </button>

          {/* ================= CUSTOM CREDIT DROPDOWN ================= */}

          <div className="relative mt-4" ref={dropdownRef}>
            {/* Trigger button */}
            <button
              type="button"
              onClick={() => setDropdownOpen((prev) => !prev)}
              className={`
                w-full
                flex
                items-center
                justify-between
                rounded-xl
                border
                bg-white/[0.06]
                px-4
                py-3
                sm:py-3.5
                text-sm
                sm:text-base
                font-medium
                text-white
                outline-none
                transition
                ${dropdownOpen
                  ? "border-purple-500 ring-1 ring-purple-500"
                  : "border-white/10"}
              `}
            >
              <span>
                {creditOptions.find((o) => o.value === credits)?.label}
              </span>

              <svg
                className={`h-4 w-4 text-gray-400 transition-transform duration-200 shrink-0 ml-2 ${
                  dropdownOpen ? "rotate-180" : ""
                }`}
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2.5"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                />
              </svg>
            </button>

            {/* Options list */}
            {dropdownOpen && (
              <div
                className="
                  absolute
                  left-0
                  right-0
                  top-[calc(100%+8px)]
                  z-50
                  overflow-hidden
                  rounded-xl
                  border
                  border-white/10
                  bg-[#111111]
                  shadow-[0_10px_40px_rgba(0,0,0,0.5)]
                "
              >
                {creditOptions.map((option) => {
                  const isSelected = option.value === credits;

                  return (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => {
                        setCredits(option.value);
                        setDropdownOpen(false);
                      }}
                      className={`
                        flex
                        w-full
                        items-center
                        justify-between
                        px-4
                        py-3
                        text-left
                        text-sm
                        sm:text-base
                        font-medium
                        transition
                        ${isSelected
                          ? "bg-purple-500/20 text-white"
                          : "text-gray-300 hover:bg-white/[0.06]"}
                      `}
                    >
                      <span>{option.label}</span>

                      {isSelected && (
                        <svg
                          className="h-4 w-4 text-purple-400 shrink-0"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="3"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M4.5 12.75l6 6 9-13.5"
                          />
                        </svg>
                      )}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* PAYMENT INFO */}

          <div className="mt-4 text-center text-xs sm:text-[13px] text-gray-400">
            <p>
              Secured payment • UPI, Cards, Net Banking accepted
            </p>

            <button
              className="
                mt-1.5
                font-medium
                text-gray-400
                underline
                transition
                hover:text-white
              "
            >
              Want to pay in USD?
            </button>
          </div>

          <hr className="my-5 sm:my-6 border-white/10" />

          {/* FEATURES */}

          <div>
            <h4 className="text-sm sm:text-md font-bold text-white">
              All features in Free, plus:
            </h4>

            <ul className="mt-4 space-y-3 sm:space-y-3.5">
              {[
                `${credits} monthly credits`,
                "3 daily credits (up to 90/month)",
                "All tools included",
                "Priority processing",
                "Priority support",
              ].map((feature, index) => (
                <li
                  key={index}
                  className="
                    flex
                    items-center
                    gap-3
                    text-sm
                    sm:text-md
                    font-medium
                    text-gray-300
                  "
                >
                  <div
                    className="
                      flex
                      h-5
                      w-5
                      shrink-0
                      items-center
                      justify-center
                      rounded-full
                      bg-purple-500/10
                    "
                  >
                    <svg
                      className="h-3 w-3 text-purple-400"
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

      {/* ================= AUTH POPUP ================= */}

      {showAuth && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
          <div
            className="
              w-full
              max-w-md
              rounded-2xl
              sm:rounded-[32px]
              border
              border-white/10
              bg-[#111111]
              p-6
              sm:p-8
              shadow-[0_0_60px_rgba(139,92,246,0.25)]
              max-h-[90vh]
              overflow-y-auto
            "
          >
            <h2 className="text-center text-2xl sm:text-3xl font-bold text-white">
              Continue to Upgrade
            </h2>

            <p className="mt-2 text-center text-sm sm:text-base text-gray-400">
              Please sign in or create an account to continue.
            </p>

            <div className="mt-6 sm:mt-8 space-y-3">
              <button
                onClick={() => {
                  setShowAuth(false);
                  setShowLogin(true);
                }}
                className="
                  h-12
                  w-full
                  rounded-2xl
                  border
                  border-white/10
                  bg-white/[0.04]
                  text-sm
                  sm:text-base
                  font-semibold
                  text-white
                  transition
                  hover:bg-white/[0.08]
                "
              >
                Log In
              </button>

              <button
                onClick={() => {
                  setShowAuth(false);
                  setShowSignup(true);
                }}
                className="
                  h-12
                  w-full
                  rounded-2xl
                  bg-gradient-to-r
                  from-orange-500
                  via-pink-500
                  to-purple-600
                  text-sm
                  sm:text-base
                  font-semibold
                  text-white
                  transition
                  hover:opacity-90
                "
              >
                Create Account
              </button>
            </div>

            <button
              onClick={() => setShowAuth(false)}
              className="
                mt-4
                w-full
                text-sm
                text-gray-500
                transition
                hover:text-white
              "
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* ================= LOGIN MODAL ================= */}

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

      {/* ================= SIGNUP MODAL ================= */}

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