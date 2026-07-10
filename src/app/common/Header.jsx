"use client";

import React, { useState } from "react";
import { FaHome, FaBars, FaTimes } from "react-icons/fa";
import Link from "next/link";
import LoginModal from "../components/LoginModal";
import SignupModal from "../components/SignupModal";

export default function Header() {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

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

            <div className="flex items-center gap-3 ml-10">
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
          className="fixed inset-0 bg-black/60 z-50"
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
        <div className="absolute bottom-0 w-full p-5 border-t border-white/10 flex flex-col gap-3">
          <button
            onClick={() => {
              setShowLogin(true);
              setMobileMenu(false);
            }}
            className="py-3 rounded-full border border-white/20 text-white"
          >
            Log In
          </button>

          <button
            onClick={() => {
              setShowSignup(true);
              setMobileMenu(false);
            }}
            className="py-3 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white"
          >
            Sign Up
          </button>
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
