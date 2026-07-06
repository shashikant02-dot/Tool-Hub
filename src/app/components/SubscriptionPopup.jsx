"use client";

import { X, Crown } from "lucide-react";
import { useRouter } from "next/navigation";

export default function SubscriptionPopup({ open, onClose }) {
  const router = useRouter();

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center">
      <div className="bg-white rounded-2xl p-8 w-[420px] relative">

        <button
          onClick={onClose}
          className="absolute top-4 right-4"
        >
          <X />
        </button>

        <div className="flex justify-center">
          <div className="bg-indigo-100 p-4 rounded-full">
            <Crown className="text-indigo-600" size={35} />
          </div>
        </div>

        <h2 className="text-3xl font-bold text-center mt-5">
          Free Limit Reached
        </h2>

        <p className="text-center text-gray-500 mt-4">
You've used all your 3 free conversions.
Upgrade your plan to continue.        </p>
<button
  onClick={() => {
    onClose();          // popup close
    router.push("/pricing");
  }}
  className="w-full mt-7 bg-indigo-600 text-white py-3 rounded-xl"
>
  Upgrade Now
</button>
{/* <button
   onClick={onClose}
>
   <X />
</button> */}

      </div>
    </div>
  );
}