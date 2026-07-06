"use client";

import { useFreeUsage } from "@/app/context/FreeUsageContext";

export default function FreeCounter() {

  const { freeUses, mounted } = useFreeUsage();

  return (

    <div className="flex justify-center mt-16">

      <div className="flex items-center gap-2 bg-gray-100 px-5 py-2 rounded-full">

        🎁

        <span className="font-semibold">

          {mounted ? freeUses : 0}/3

          <span className="text-gray-500">
            {" "}
            free uses
          </span>

        </span>

      </div>

    </div>

  );
}