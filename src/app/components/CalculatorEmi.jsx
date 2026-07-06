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
            <h1 className="text-4xl font-semibold text-gray-900 tracking-tight">
              EMI Calculator
            </h1>
            <p className="text-gray-500 mt-2 text-sm">
              Plan your loan with accurate monthly breakdown
            </p>
          </div>

          {/* MAIN GRID */}
          <div className="grid lg:grid-cols-3 gap-6">
            {/* LEFT */}
            <div className="lg:col-span-2 space-y-6">
              {/* INPUT CARD */}
              <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm space-y-6">
                {/* Amount */}
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600 text-sm">Loan Amount</span>
                    <span className="text-gray-900 font-semibold">
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
                    className="w-full accent-gray-900"
                  />
                </div>

                {/* Rate */}
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600 text-sm">Interest Rate</span>
                    <span className="text-gray-900 font-semibold">
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
                    className="w-full accent-gray-900"
                  />
                </div>

                {/* Tenure */}
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600 text-sm">Loan Tenure</span>
                    <span className="text-gray-900 font-semibold">
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
                    className="w-full accent-gray-900"
                  />
                </div>
              </div>

              {/* BREAKDOWN */}
              <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                <h3 className="text-sm font-medium text-gray-700 mb-4">
                  Payment Breakdown
                </h3>

                <div className="h-3 w-full bg-gray-100 rounded-full overflow-hidden flex">
                  <div
                    className="bg-gray-900"
                    style={{
                      width: `${(amount / emiData.totalPayment) * 100}%`,
                    }}
                  />
                  <div className="bg-gray-300 flex-1" />
                </div>

                <div className="flex justify-between mt-7 font-bold text-sm text-gray-600 ">
                  <span>Principal</span>
                  <span className="text-gray-900 font-medium ">
                    ₹{formatINR(amount)}
                  </span>
                </div>

                <div className="flex justify-between text-sm mt-7 font-bold text-gray-600">
                  <span>Interest</span>
                  <span className="text-gray-900 font-medium">
                    ₹{formatINR(emiData.totalInterest)}
                  </span>
                </div>
              </div>
            </div>

            {/* RIGHT */}
            <div className="space-y-6">
              {/* EMI CARD */}
              <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                <p className="text-gray-500 text-sm">Monthly EMI</p>
                <h2 className="text-3xl font-semibold text-gray-900 mt-2">
                  ₹{formatINR(emiData.emi)}
                </h2>
              </div>

              <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                <p className="text-gray-500 text-sm">Total Interest</p>
                <h2 className="text-2xl font-semibold text-gray-900 mt-2">
                  ₹{formatINR(emiData.totalInterest)}
                </h2>
              </div>

              <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                <p className="text-gray-500 text-sm">Total Payment</p>
                <h2 className="text-2xl font-semibold text-gray-900 mt-2">
                  ₹{formatINR(emiData.totalPayment)}
                </h2>
              </div>

              {/* INFO BOX */}
              <div className="bg-gray-900 text-white rounded-2xl p-6">
                <p className="text-sm text-gray-300">Insight</p>
                <p className="mt-2 text-sm leading-relaxed text-gray-200">
                  Higher tenure reduces EMI but increases total interest. Adjust
                  sliders to optimize repayment.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center   gap-4 my-1 mb-22">
        <div className="flex items-center gap-2 font-semibold text-xl whitespace-nowrap">
          <AiOutlineShareAlt className="text-2xl" />
          <span>Share this calculator</span>
        </div>

        <FaFacebook className="cursor-pointer text-2xl" />
        <FaXTwitter className="cursor-pointer text-2xl" />
        <FaLinkedinIn className="cursor-pointer text-2xl" />
        <FaWhatsapp className="cursor-pointer text-2xl" />
        <FaRegCopy className="cursor-pointer text-2xl" />
      </div>

      <CardInfo
        heading={
          <>
            How It Works in{" "}
            <span className="text-indigo-600">4 Simple Steps</span>
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

      <CardInfo3
        heading={<>Why Use Our EMI Calculator? </>}
        subheading="Advantages of our free EMI calculator

"
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
      {showSignup && <SignupModal onClose={() => setShowSignup(false)} />}
    </>
  );
}
