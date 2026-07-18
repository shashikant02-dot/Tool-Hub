import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: false }, // not required for Google users
    googleId: { type: String, unique: true, sparse: true },
    picture: { type: String },
    provider: { type: String, enum: ["credentials", "google"], default: "credentials" },

    // ✅ Payment / Pro access tracking
    isPro: { type: Boolean, default: false }, // true only after a verified payment
    credits: { type: Number, default: 0 }, // total credits purchased (informational)
    proExpiry: { type: Date, default: null }, // plan valid till this date (30 days)
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model("User", UserSchema);