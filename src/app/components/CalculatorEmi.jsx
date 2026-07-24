"use client";

import React, { useState, useMemo } from "react";
import CardInfo from "./CardInfo";
import CardInfo3 from "./cardInfo3";
import { AiOutlineShareAlt } from "react-icons/ai";
import { FaFacebook } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaLinkedinIn } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";
import { FaRegCopy } from "react-icons/fa6";
import SignupModal from "./SignupModal";

export default function CalculatorEmi() {
  const [amount, setAmount] = useState(5000000);
  const [rate, setRate] = useState(8.5);
  const [tenure, setTenure] = useState(20);
  const [showSignup, setShowSignup] = useState(false);
  const [modalShown, setModalShown] = useState(false);

  const handleProtectedAction = () => {
    if (!modalShown) {
      setShowSignup(true);
      setModalShown(true);
    }
  };

  const emiData = useMemo(() => {
    const P = amount;
    const R = rate / 12 / 100;
    const N = tenure * 12;

    const emi = (P * R * Math.pow(1 + R, N)) / (Math.pow(1 + R, N) - 1);
    const totalPayment = emi * N;
    const totalInterest = totalPayment - P;

    return {
      emi: Math.round(emi),
      totalPayment: Math.round(totalPayment),
      totalInterest: Math.round(totalInterest),
    };
  }, [amount, rate, tenure]);

  const formatINR = (num) => new Intl.NumberFormat("en-IN").format(num);

  return (
    <>
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="w-full max-w-6xl">

          {/* HEADER */}
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold tracking-tight text-white">
              EMI Calculator
            </h1>

            <p className="mt-2 text-sm text-gray-400">
              Plan your loan with accurate monthly breakdown
            </p>
          </div>

          {/* MAIN GRID */}
          <div className="grid gap-6 lg:grid-cols-3">

            {/* LEFT */}
            <div className="space-y-6 lg:col-span-2">

              {/* INPUT CARD */}
              <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-2xl backdrop-blur-xl space-y-8">

                {/* Amount */}
                <div>
                  <div className="mb-3 flex justify-between">
                    <span className="text-sm text-gray-400">
                      Loan Amount
                    </span>

                    <span className="font-semibold text-white">
                      ₹{formatINR(amount)}
                    </span>
                  </div>

                  <input
                    type="range"
                    min="100000"
                    max="10000000"
                    step="50000"
                    value={amount}
                    onChange={(e) => {
                      setAmount(Number(e.target.value));
                      handleProtectedAction();
                    }}
                    className="h-2 w-full cursor-pointer appearance-none rounded-full bg-white/10 accent-orange-500"
                  />
                </div>

                {/* Rate */}
                <div>
                  <div className="mb-3 flex justify-between">
                    <span className="text-sm text-gray-400">
                      Interest Rate
                    </span>

                    <span className="font-semibold text-white">
                      {rate}% p.a.
                    </span>
                  </div>

                  <input
                    type="range"
                    min="5"
                    max="20"
                    step="0.1"
                    value={rate}
                    onChange={(e) => {
                      setRate(Number(e.target.value));
                      handleProtectedAction();
                    }}
                    className="h-2 w-full cursor-pointer appearance-none rounded-full bg-white/10 accent-pink-500"
                  />
                </div>

                {/* Tenure */}
                <div>
                  <div className="mb-3 flex justify-between">
                    <span className="text-sm text-gray-400">
                      Loan Tenure
                    </span>

                    <span className="font-semibold text-white">
                      {tenure} Years
                    </span>
                  </div>

                  <input
                    type="range"
                    min="1"
                    max="30"
                    value={tenure}
                    onChange={(e) => {
                      setTenure(Number(e.target.value));
                      handleProtectedAction();
                    }}
                    className="h-2 w-full cursor-pointer appearance-none rounded-full bg-white/10 accent-purple-500"
                  />
                </div>
              </div>

              {/* BREAKDOWN */}
              <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-2xl backdrop-blur-xl">

                <h3 className="mb-5 text-sm font-medium text-gray-300">
                  Payment Breakdown
                </h3>

                <div className="flex h-3 w-full overflow-hidden rounded-full bg-white/10">

                  <div
                    className="bg-gradient-to-r from-orange-400 via-pink-500 to-purple-500"
                    style={{
                      width: `${(amount / emiData.totalPayment) * 100}%`,
                    }}
                  />

                  <div className="flex-1 bg-white/10" />
                </div>

                <div className="mt-7 flex justify-between text-sm">
                  <span className="text-gray-400">
                    Principal
                  </span>

                  <span className="font-medium text-white">
                    ₹{formatINR(amount)}
                  </span>
                </div>

                <div className="mt-5 flex justify-between text-sm">
                  <span className="text-gray-400">
                    Interest
                  </span>

                  <span className="font-medium text-white">
                    ₹{formatINR(emiData.totalInterest)}
                  </span>
                </div>
              </div>
            </div>

            {/* RIGHT */}
            <div className="space-y-6">

              {/* EMI CARD */}
              <div className="rounded-3xl border border-orange-500/20 bg-gradient-to-br from-orange-500/10 via-pink-500/10 to-purple-500/10 p-6 shadow-2xl backdrop-blur-xl">

                <p className="text-sm text-gray-400">
                  Monthly EMI
                </p>

                <h2 className="mt-2 text-4xl font-bold text-white">
                  ₹{formatINR(emiData.emi)}
                </h2>
              </div>

              {/* INTEREST */}
              <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-2xl backdrop-blur-xl">

                <p className="text-sm text-gray-400">
                  Total Interest
                </p>

                <h2 className="mt-2 text-2xl font-semibold text-white">
                  ₹{formatINR(emiData.totalInterest)}
                </h2>
              </div>

              {/* TOTAL */}
              <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-2xl backdrop-blur-xl">

                <p className="text-sm text-gray-400">
                  Total Payment
                </p>

                <h2 className="mt-2 text-2xl font-semibold text-white">
                  ₹{formatINR(emiData.totalPayment)}
                </h2>
              </div>

              {/* INFO BOX */}
              <div className="rounded-3xl border border-purple-500/20 bg-gradient-to-br from-purple-600/20 to-blue-600/10 p-6 text-white">

                <p className="text-sm text-gray-300">
                  Insight
                </p>

                <p className="mt-2 text-sm leading-relaxed text-gray-300">
                  Higher tenure reduces EMI but increases total interest.
                  Adjust sliders to optimize repayment.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SHARE */}
      <div className="my-1 mb-22 flex flex-wrap items-center justify-center gap-4 text-white">

        <div className="flex items-center gap-2 whitespace-nowrap text-xl font-semibold">
          <AiOutlineShareAlt className="text-2xl" />
          <span>Share this calculator</span>
        </div>

        <FaFacebook className="cursor-pointer text-2xl text-gray-400 transition hover:text-blue-500" />
        <FaXTwitter className="cursor-pointer text-2xl text-gray-400 transition hover:text-white" />
        <FaLinkedinIn className="cursor-pointer text-2xl text-gray-400 transition hover:text-blue-500" />
        <FaWhatsapp className="cursor-pointer text-2xl text-gray-400 transition hover:text-green-500" />
        <FaRegCopy className="cursor-pointer text-2xl text-gray-400 transition hover:text-white" />
      </div>

      {/* PROCESS GUIDE */}
      <CardInfo
        heading={
          <>
            How It Works in{" "}
            <span className="text-indigo-600">
              4 Simple Steps
            </span>
          </>
        }
        subheading="Follow these simple steps"
        steps={[
          {
            stepNumber: "STEP 01",
            title: "Enter Loan Amount",
            description:
              "Input the total principal amount you want to borrow. This is the base loan amount before interest.",
          },
          {
            stepNumber: "STEP 02",
            title: "Set Interest Rate",
            description:
              "Enter the annual interest rate offered by your bank or lender. Most home loans have rates between 8-10% per annum.",
          },
          {
            stepNumber: "STEP 03",
            title: "Choose Loan Tenure",
            description:
              "Select how many years you want to repay the loan. Longer tenure means lower EMI but higher total interest paid.",
          },
          {
            stepNumber: "STEP 04",
            title: "View Instant Results",
            description:
              "See your monthly EMI, total interest payable, total payment amount, and detailed principal vs interest breakdown.",
          },
        ]}
      />

      {/* FEATURES */}
      <CardInfo3
        heading={<>Why Use Our EMI Calculator?</>}
        subheading="Advantages of our free EMI calculator"
        steps={[
          {
            stepNumber: "01",
            title: "Instant Results",
            description:
              "Get EMI calculated in milliseconds with 100% accuracy using standard formula",
          },
          {
            stepNumber: "02",
            title: "Completely Free",
            description:
              "No registration, no hidden fees, unlimited calculations anytime",
          },
          {
            stepNumber: "03",
            title: "Detailed Breakdown",
            description:
              "View principal vs interest split and complete payment breakdown",
          },
          {
            stepNumber: "04",
            title: "100% Accurate",
            description:
              "Uses standard EMI formula recognized by all Indian banks and financial institutions",
          },
          {
            stepNumber: "05",
            title: "Mobile Friendly",
            description:
              "Works perfectly on all devices - iPhone, Android, tablet, desktop",
          },
          {
            stepNumber: "06",
            title: "Dark Mode",
            description:
              "Eye-friendly dark theme for comfortable calculations at any time",
          },
        ]}
      />

      {showSignup && (
        <SignupModal
          onClose={() => setShowSignup(false)}
        />
      )}
    </>
  );
}