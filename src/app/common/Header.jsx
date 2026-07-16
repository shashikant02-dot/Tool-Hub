"use client";

import React, { useEffect, useRef, useState } from "react";
import { FaHome, FaBars, FaTimes, FaUserCircle } from "react-icons/fa";
import Link from "next/link";
import LoginModal from "../components/LoginModal";
import SignupModal from "../components/SignupModal";

export default function Header() {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [user, setUser] = useState(null);
  const [showProfile, setShowProfile] = useState(false);
  const desktopMenuRef = useRef(null);
  const mobileMenuRef = useRef(null);
  useEffect(() => {
  const loadUser = async () => {
    try {
      const res = await fetch("/api/auth/me");
      const data = await res.json();
      if (data.user) {
        setUser(data.user);
        localStorage.setItem("user", JSON.stringify(data.user));
        return;
      }
    } catch (err) {
      console.error("Failed to load user:", err);
    }

    // fallback for existing email/password flow
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  };

  loadUser();
}, []);
// ✅ NEW: keep the header in sync when login/signup happens elsewhere on
  // the site (e.g. from the "free limit reached" popup on a tool page)
  useEffect(() => {
    const syncUser = () => {
      const storedUser = localStorage.getItem("user");
      setUser(storedUser ? JSON.parse(storedUser) : null);
    };

    window.addEventListener("authchange", syncUser);
    return () => window.removeEventListener("authchange", syncUser);
  }, []);

  useEffect(() => {
    const handleClick = (e) => {
      const desktop = desktopMenuRef.current?.contains(e.target);

      const mobile = mobileMenuRef.current?.contains(e.target);

      if (!desktop && !mobile) {
        setShowProfile(false);
      }
    };

    document.addEventListener("mousedown", handleClick);

    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);
  const handleLogout = async () => {
  console.log("logout clicked");

  try {
    await fetch("/api/auth/logout", { method: "POST" });
  } catch (err) {
    console.error("Logout failed:", err);
  }

  localStorage.removeItem("user");
  setUser(null);
  setShowProfile(false);
  setMobileMenu(false);
   window.dispatchEvent(new Event("authchange"));
};
  const navItems = [
    { name: "Home", path: "/" },
    { name: "Tools", path: "/tools" },
    { name: "AI Tools", path: "/al-tools" },
    { name: "Calculators", path: "/calculator" },
    { name: "Pricing", path: "/pricing" },
  ];

  return (
    <>
      {/* HEADER */}
      <nav className="w-full fixed top-0 z-50 border-b border-white/10 bg-gradient-to-r from-black via-slate-900 to-black backdrop-blur-xl shadow-lg">
        <div className="max-w-screen-xl mx-auto flex items-center justify-between px-6 py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-white/10 border border-white/10">
              <FaHome className="text-2xl text-indigo-400" />
            </div>
            <span className="font-bold text-2xl text-white">ToolHub</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-12">
            <ul className="flex items-center gap-8 text-md font-medium text-gray-300">
              {navItems.map((item, i) => (
                <li key={i}>
                  <Link
                    href={item.path}
                    className="relative group hover:text-white transition"
                  >
                    {item.name}
                    <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-gradient-to-r from-indigo-500 to-purple-500 transition-all group-hover:w-full"></span>
                  </Link>
                </li>
              ))}
            </ul>

            <div className="ml-10 relative" ref={desktopMenuRef}>
              {user ? (
                <>
                  <button
                    onClick={() => setShowProfile(!showProfile)}
                    className="flex items-center gap-2 text-white"
                  >
                    <FaUserCircle size={30} />
                    <span>{user.name}</span>
                  </button>

                  {showProfile && (
<div className="absolute right-0 mt-3 w-56 bg-white rounded-xl shadow-xl overflow-hidden z-[100]">
<div className="px-4 py-3 border-b">
                        <h3 className="font-semibold">{user.name}</h3>
                        <p className="text-sm text-gray-500">{user.email}</p>
                      </div>

                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-3 hover:bg-gray-100 text-red-500"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowLogin(true)}
                    className="px-5 py-2 text-white border border-white/20 rounded-full"
                  >
                    Log In
                  </button>

                  <button
                    onClick={() => setShowSignup(true)}
                    className="px-5 py-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white"
                  >
                    Sign Up
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white text-2xl"
            onClick={() => setMobileMenu(true)}
          >
            <FaBars />
          </button>
        </div>
      </nav>

      {/* BACKDROP */}
      {mobileMenu && (
        <div
          className="fixed inset-0 bg-black/60 z-40"
          onClick={() => setMobileMenu(false)}
        />
      )}

      {/* ================= HALF SCREEN DRAWER ================= */}
      <div
        className={`fixed top-0 right-0 h-full w-[70%] sm:w-[50%] bg-slate-950 border-l border-white/10 z-50 transform transition-transform duration-300
        ${mobileMenu ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Top header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
          <span className="text-white font-bold text-lg">Menu</span>

          <button
            onClick={() => setMobileMenu(false)}
            className="text-white text-2xl"
          >
            <FaTimes />
          </button>
        </div>

        {/* Nav links */}
        <div className="flex flex-col gap-6 px-6 py-8">
          {navItems.map((item, i) => (
            <Link
              key={i}
              href={item.path}
              onClick={() => setMobileMenu(false)}
              className="text-gray-300 hover:text-white text-lg font-medium border-b border-white/5 pb-2"
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Buttons */}
        <div 
className="ml-10 relative"
ref={mobileMenuRef}
>
          {user ? (
            <>
              <button
                onClick={() => setShowProfile(!showProfile)}
                className="flex items-center gap-3 text-white"
              >
                <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center font-bold">
                  {user.name?.charAt(0).toUpperCase()}
                </div>

                <div className="text-left">
                  <p className="text-sm font-semibold">{user.name}</p>
                  <p className="text-xs text-gray-400">{user.email}</p>
                </div>
              </button>

              {showProfile && (
                <div className="absolute right-0 mt-3 w-64 bg-white rounded-xl shadow-xl overflow-hidden">
                  <div className="px-4 py-4 border-b">
                    <h3 className="font-semibold text-gray-800">{user.name}</h3>

                    <p className="text-sm text-gray-500">{user.email}</p>
                  </div>

                  <button className="w-full text-left px-4 py-3 hover:bg-gray-100">
                    Dashboard
                  </button>

                  <button className="w-full text-left px-4 py-3 hover:bg-gray-100">
                    Profile
                  </button>

                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-3 text-red-500 hover:bg-red-50"
                  >
                    Logout
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowLogin(true)}
                className="px-5 py-2 text-white/90 border border-white/20 rounded-full bg-white/5 hover:bg-white/10"
              >
                Log In
              </button>

              <button
                onClick={() => setShowSignup(true)}
                className="px-5 py-2 text-white rounded-full bg-gradient-to-r from-indigo-500 to-purple-600"
              >
                Sign Up
              </button>
            </div>
          )}
        </div>
      </div>

      {/* MODALS */}

      {showLogin && (
        <LoginModal
          onClose={() => setShowLogin(false)}
          openSignup={() => {
            setShowLogin(false);
            setShowSignup(true);
          }}
          onLoginSuccess={(loggedUser) => {
            setUser(loggedUser);
          }}
        />
      )}

      {showSignup && (
        <SignupModal
          onClose={() => setShowSignup(false)}
          openLogin={() => {
            setShowSignup(false);
            setShowLogin(true);
          }}
        />
      )}
    </>
  );
}
