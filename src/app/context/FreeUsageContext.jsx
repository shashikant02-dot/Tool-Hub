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
  // ✅ NEW: tracks whether the visitor is logged in on the site
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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

  setIsLoggedIn(!!localStorage.getItem("user"));
}, []);

  useEffect(() => {
  if (!mounted) return;

  localStorage.setItem("freeUses", JSON.stringify(freeUses));

  if (!localStorage.getItem("freeUsesLastReset")) {
    localStorage.setItem("freeUsesLastReset", Date.now().toString());
  }
}, [freeUses, mounted]);

  // ✅ NEW: stay in sync with login/signup/logout happening anywhere on the
  // site (header, the free-limit popup, etc). Everywhere the user logs in
  // or out, a global "authchange" event is fired.
  useEffect(() => {
    const syncAuth = () => {
      const loggedIn = !!localStorage.getItem("user");
      setIsLoggedIn(loggedIn);

      // Once someone logs in / signs up, they're no longer limited —
      // close the "free limit reached" popup automatically.
      if (loggedIn) setShowPopup(false);
    };

    window.addEventListener("authchange", syncAuth);
    window.addEventListener("storage", syncAuth);

    return () => {
      window.removeEventListener("authchange", syncAuth);
      window.removeEventListener("storage", syncAuth);
    };
  }, []);

  // ✅ FIXED: per-tool limit check — logged-in users are never limited
  const checkLimit = (tool) => {
    if (isLoggedIn) return false;
    return (freeUses[tool] || 0) >= DEFAULT_LIMIT;
  };

  // ✅ FIXED: safe increment — no need to track usage once logged in
  const increaseUsage = (tool) => {
    if (isLoggedIn) return;
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