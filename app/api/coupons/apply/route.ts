import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

function corsHeaders() {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 200, headers: corsHeaders() });
}

export async function POST(request: NextRequest) {
  try {
    const { code, email } = await request.json();

    if (!code) {
      return NextResponse.json(
        { success: false, error: "Coupon code is required" },
        { status: 400, headers: corsHeaders() }
      );
    }

    if (!email) {
      return NextResponse.json(
        { success: false, error: "Email is required" },
        { status: 400, headers: corsHeaders() }
      );
    }

    const { data: coupon, error: fetchError } = await supabase
      .from("coupons")
      .select("*")
      .eq("code", code.toUpperCase())
      .single();

    if (fetchError || !coupon) {
      return NextResponse.json(
        { success: false, error: "Coupon not found" },
        { status: 404, headers: corsHeaders() }
      );
    }

    if (coupon.expiryDate && new Date(coupon.expiryDate) < new Date()) {
      return NextResponse.json(
        { success: false, error: "Coupon has expired" },
        { status: 400, headers: corsHeaders() }
      );
    }

    if (
      coupon.usageLimitPerCoupon !== null &&
      coupon.currentUsage >= coupon.usageLimitPerCoupon
    ) {
      return NextResponse.json(
        { success: false, error: "Coupon usage limit reached" },
        { status: 400, headers: corsHeaders() }
      );
    }

    if (coupon.allowedEmails && coupon.allowedEmails.includes(email)) {
      return NextResponse.json(
        { success: false, error: "You have already used this coupon" },
        { status: 400, headers: corsHeaders() }
      );
    }

    const updatedEmails = [...(coupon.allowedEmails || []), email];

    const { data: updatedCoupon, error: updateError } = await supabase
      .from("coupons")
      .update({ 
        currentUsage: coupon.currentUsage + 1,
        allowedEmails: updatedEmails
      })
      .eq("id", coupon.id)
      .select()
      .single();

    if (updateError) {
      return NextResponse.json(
        { success: false, error: updateError.message },
        { status: 500, headers: corsHeaders() }
      );
    }

    return NextResponse.json({ success: true, data: updatedCoupon }, { headers: corsHeaders() });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500, headers: corsHeaders() }
    );
  }
}
