import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";

export async function GET(request) {
  try {
    const token = request.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.json({ user: null });
    }


    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );


    await connectDB();


    const user = await User.findById(decoded.id)
      .select("-password");


    if (!user) {
      return NextResponse.json({ user: null });
    }


    return NextResponse.json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        picture: user.picture,
      },
    });


  } catch (error) {

    console.log("Auth Error:", error.message);

    return NextResponse.json({
      user: null,
    });
  }
}