import { NextResponse } from "next/server";
import razorpay from "@/lib/razorpay";

export async function POST(req) {

  try {

    const { amount } = await req.json();


    const order = await razorpay.orders.create({
      amount: amount * 100,
      currency: "INR",
      receipt: "toolhub_" + Date.now(),
    });


    return NextResponse.json({
      success:true,
      order,
    });


  } catch(error){

    console.log(error);

    return NextResponse.json(
      {
        error:error.message
      },
      {
        status:500
      }
    );

  }
}