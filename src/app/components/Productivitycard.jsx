import React from "react";
import { Clock3, TrendingUp } from "lucide-react";

export default function ProductivityCard() {
  return (
    <div className=" max-w-[430px] rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm m-auto">

      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-50">
          <Clock3 className="h-5 w-5 text-indigo-600" />
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-indigo-600">
            Productivity Impact
          </p>

          <h3 className="text-xl font-bold text-slate-900">
            Save More Time
          </h3>
        </div>
      </div>

      {/* Description */}
      <p className="mt-5 text-slate-600 leading-7">
        Thousands of users automate repetitive tasks using ToolHub and save
        valuable hours every week.
      </p>

      {/* Divider */}
      <div className="my-7 h-px bg-slate-200" />

      {/* Main Stat */}
      <div>
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-5xl font-bold text-slate-900">
              14.5
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Hours saved weekly
            </p>
          </div>

          <div className="flex items-center gap-1 rounded-full bg-green-50 px-3 py-1">
            <TrendingUp size={14} className="text-green-600" />
            <span className="text-sm font-medium text-green-600">
              +78%
            </span>
          </div>
        </div>

        {/* Progress */}
        <div className="mt-6">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-sm font-medium text-slate-700">
              Power Users
            </span>

            <span className="text-sm text-slate-500">
              85%
            </span>
          </div>

          <div className="h-3 w-full rounded-full bg-slate-100 overflow-hidden">
            <div className="h-full w-[85%] rounded-full bg-indigo-600" />
          </div>
        </div>
      </div>

      {/* Secondary Stat */}
      <div className="mt-7 rounded-2xl bg-slate-50 p-5 border border-slate-100">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-3xl font-bold text-slate-700">
              8.2
            </h4>

            <p className="text-sm text-slate-500 mt-1">
              Average users
            </p>
          </div>

          <span className="rounded-full bg-white px-3 py-1 text-xs font-medium text-slate-600 border border-slate-200">
            Weekly
          </span>
        </div>
      </div>

    </div>
  );
}