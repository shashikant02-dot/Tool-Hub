"use client";

import { useState } from "react";
import { X, Lock } from "lucide-react";
import { useRouter } from "next/navigation";
import LoginModal from "./LoginModal";
import SignupModal from "./SignupModal";
import { useFreeUsage } from "@/app/context/FreeUsageContext";

export default function SubscriptionPopup({ open, onClose }) {
  const router = useRouter();
  const { isLoggedIn } = useFreeUsage();
  // "offer" = the free-limit-reached screen, "login"/"signup" = auth forms
  const [view, setView] = useState("offer");

  if (!open) return null;

  const handleClose = () => {
    setView("offer");
    onClose();
  };

  const handleAuthSuccess = () => {
    setView("offer");
    onClose();
  };

  if (view === "login") {
    return (
      <LoginModal
        onClose={handleClose}
        openSignup={() => setView("signup")}
        onLoginSuccess={handleAuthSuccess}
      />
    );
  }

  if (view === "signup") {
    return (
      <SignupModal
        onClose={handleClose}
        openLogin={() => setView("login")}
        onSignupSuccess={handleAuthSuccess}
      />
    );
  }

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl p-8 w-[420px] max-w-full relative">
        <button onClick={handleClose} className="absolute top-4 right-4">
          <X />
        </button>

        <div className="flex justify-center">
          <div className="bg-indigo-100 p-4 rounded-full">
            <Lock className="text-indigo-600" size={35} />
          </div>
        </div>

        <h2 className="text-3xl font-bold text-center mt-5">
          Free Limit Reached
        </h2>

        <p className="text-center text-gray-500 mt-4">
          {isLoggedIn
            ? "You've used all your 3 free conversions. Upgrade to a paid plan for unlimited access."
            : "You've used all your 3 free conversions. Log in or create a free account, then upgrade for unlimited access."}
        </p>

        {!isLoggedIn && (
          <>
            <button
              onClick={() => setView("login")}
              className="w-full mt-7 bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700 transition"
            >
              Log In
            </button>

            <button
              onClick={() => setView("signup")}
              className="w-full mt-3 border border-indigo-600 text-indigo-600 py-3 rounded-xl font-semibold hover:bg-indigo-50 transition"
            >
              Sign Up
            </button>
          </>
        )}

        <button
          onClick={() => {
            handleClose();
            router.push("/pricing");
          }}
          className={
            isLoggedIn
              ? "w-full mt-7 bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700 transition"
              : "w-full mt-4 text-sm text-gray-500 underline"
          }
        >
          {isLoggedIn ? "Upgrade Now" : "Or view paid plans"}
        </button>
      </div>
    </div>
  );
}