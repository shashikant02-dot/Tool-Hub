"use client";

import SubscriptionPopup from "./SubscriptionPopup";
import { useFreeUsage } from "@/app/context/FreeUsageContext";

export default function PopupProvider() {
  const { showPopup, setShowPopup, mounted } = useFreeUsage();

  if (!mounted) return null;

  return (
    <SubscriptionPopup open={showPopup} onClose={() => setShowPopup(false)} />
  );
}
