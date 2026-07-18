"use client";

import { createContext, useContext, useEffect, useState } from "react";

const FreeUsageContext = createContext(null);

const DEFAULT_LIMIT = 3;

const DEFAULT_USES = {
  excel: 0,
  pdfSplit: 0,
  jpgToPdf: 0,
  csvToJson: 0,
  "image-converter": 0,
  "image-compress": 0,
  "merge-pdf": 0,
  "handwriting-to-text": 0,
  "image-excel": 0,
  "image-to-code": 0,
};
export function FreeUsageProvider({ children }) {
  const [freeUses, setFreeUses] = useState(DEFAULT_USES);

  const [showPopup, setShowPopup] = useState(false);
  const [mounted, setMounted] = useState(false);
  // ✅ tracks whether the visitor is logged in on the site
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // ✅ tracks whether the visitor has an ACTIVE paid plan (unlimited use)
  const [isPro, setIsPro] = useState(false);

  // Ask the server who's actually logged in / paid — localStorage alone
  // can't be trusted for this and can go stale (e.g. expired plan).
  const refreshAuthStatus = async () => {
    try {
      const res = await fetch("/api/auth/me", {
        credentials: "include",
        cache: "no-store",
      });
      const data = await res.json();

      const loggedIn = !!data.user;
      setIsLoggedIn(loggedIn);
      setIsPro(!!data.user?.isPro);

      if (loggedIn) {
        localStorage.setItem("user", JSON.stringify(data.user));
      } else {
        localStorage.removeItem("user");
      }

      // Once someone is on an active paid plan, they're unlimited —
      // close the "free limit reached" popup automatically.
      if (data.user?.isPro) setShowPopup(false);
    } catch (err) {
      console.error("Auth status check failed:", err);
    }
  };

  useEffect(() => {
    setMounted(true);

    const savedUses = localStorage.getItem("freeUses");
    const lastReset = localStorage.getItem("freeUsesLastReset");

    const now = Date.now();
    const DAY = 24 * 60 * 60 * 1000;

    if (!lastReset || now - Number(lastReset) >= DAY) {
      localStorage.setItem("freeUses", JSON.stringify(DEFAULT_USES));
      localStorage.setItem("freeUsesLastReset", now.toString());
      setFreeUses(DEFAULT_USES);
    } else if (savedUses) {
      setFreeUses(JSON.parse(savedUses));
    }

    refreshAuthStatus();
  }, []);

  useEffect(() => {
    if (!mounted) return;

    localStorage.setItem("freeUses", JSON.stringify(freeUses));

    if (!localStorage.getItem("freeUsesLastReset")) {
      localStorage.setItem("freeUsesLastReset", Date.now().toString());
    }
  }, [freeUses, mounted]);

  // ✅ stay in sync with login/signup/logout/payment happening anywhere on
  // the site. Everywhere the user logs in, signs up, or pays, a global
  // "authchange" event is fired.
  useEffect(() => {
    const syncAuth = () => {
      refreshAuthStatus();
    };

    window.addEventListener("authchange", syncAuth);
    window.addEventListener("storage", syncAuth);

    return () => {
      window.removeEventListener("authchange", syncAuth);
      window.removeEventListener("storage", syncAuth);
    };
  }, []);

  // ✅ Per-tool limit check — ONLY an active paid plan removes the limit.
  // Being logged in (but not paid) still counts against the free limit,
  // it just shows an "upgrade" prompt instead of a "login" prompt.
  const checkLimit = (tool) => {
    if (isPro) return false;
    return (freeUses[tool] || 0) >= DEFAULT_LIMIT;
  };

  // ✅ Safe increment — no need to track usage once on an active paid plan
  const increaseUsage = (tool) => {
    if (isPro) return;
    setFreeUses((prev) => ({
      ...prev,
      [tool]: (prev[tool] || 0) + 1,
    }));
  };

  return (
    <FreeUsageContext.Provider
      value={{
        freeUses,
        setFreeUses,
        showPopup,
        setShowPopup,
        checkLimit,
        increaseUsage,
        mounted,
        isLoggedIn,
        isPro,
      }}
    >
      {children}
    </FreeUsageContext.Provider>
  );
}

export function useFreeUsage() {
  const ctx = useContext(FreeUsageContext);
  if (!ctx) throw new Error("useFreeUsage must be used inside provider");
  return ctx;
}