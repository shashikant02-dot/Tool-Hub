import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";

const FREE_LIMIT = 3;
const DAY = 24 * 60 * 60 * 1000;

// Shared helper: verify the JWT cookie and load the user document.
// Returns { user } or { error, status }.
async function getAuthedUser(request) {
  const token = request.cookies.get("token")?.value;

  if (!token) {
    return { error: "Not logged in", status: 401 };
  }

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch {
    return { error: "Invalid session", status: 401 };
  }

  await connectDB();
  const user = await User.findById(decoded.id);

  if (!user) {
    return { error: "User not found", status: 401 };
  }

  return { user };
}

// Reset the per-tool counters if a day has passed since the last reset —
// mirrors the same daily-reset behaviour anonymous users get in localStorage.
function applyDailyResetIfNeeded(user) {
  const now = Date.now();
  const lastReset = user.toolUsageResetAt
    ? new Date(user.toolUsageResetAt).getTime()
    : 0;

  if (!lastReset || now - lastReset >= DAY) {
    user.toolUsage = new Map();
    user.toolUsageResetAt = new Date(now);
    return true; // changed, needs saving
  }
  return false;
}

function isProActive(user) {
  return !!(user.isPro && user.proExpiry && new Date(user.proExpiry) > new Date());
}

// GET /api/usage — return the logged-in user's current per-tool usage counts.
// Used on login/page-load to sync the frontend's free-use counters with
// the authoritative server-side numbers.
export async function GET(request) {
  const { user, error, status } = await getAuthedUser(request);
  if (error) return NextResponse.json({ error }, { status });

  const changed = applyDailyResetIfNeeded(user);
  if (changed) await user.save();

  return NextResponse.json({
    toolUsage: Object.fromEntries(user.toolUsage || []),
    isPro: isProActive(user),
  });
}

// POST /api/usage  { tool: "handwriting-to-text" }
// Atomically checks the free limit and increments usage for that tool.
// This is the enforcement point for logged-in users — it can't be bypassed
// by clearing localStorage, since the count lives on the user's account.
export async function POST(request) {
  const { user, error, status } = await getAuthedUser(request);
  if (error) return NextResponse.json({ error }, { status });

  const body = await request.json().catch(() => ({}));
  const tool = body?.tool;

  if (!tool || typeof tool !== "string") {
    return NextResponse.json({ error: "Missing tool name" }, { status: 400 });
  }

  // Pro users are unlimited — no need to track or check anything.
  if (isProActive(user)) {
    return NextResponse.json({ allowed: true, unlimited: true });
  }

  applyDailyResetIfNeeded(user);

  const current = user.toolUsage.get(tool) || 0;

  if (current >= FREE_LIMIT) {
    await user.save(); // persist a reset, if one just happened
    return NextResponse.json({ allowed: false, used: current });
  }

  const updated = current + 1;
  user.toolUsage.set(tool, updated);
  await user.save();

  return NextResponse.json({ allowed: true, used: updated });
}