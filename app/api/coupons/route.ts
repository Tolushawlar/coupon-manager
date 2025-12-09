import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

function corsHeaders() {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 200, headers: corsHeaders() });
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');
  try {
    let query = supabase.from('coupons').select('*');
    
    if (code) {
      query = query.eq('code', code);
    } else {
      query = query.order('createdAt', { ascending: false });
    }

    const { data: coupons, error } = await query;

    if (error) throw error;

    return NextResponse.json({ success: true, data: coupons }, { headers: corsHeaders() });
  } catch (error) {
    console.error('Error fetching coupons:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch coupons' },
      { status: 500, headers: corsHeaders() }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    if (!body.code || !body.discountType) {
      return NextResponse.json(
        { success: false, error: 'Code and discount type are required' },
        { status: 400, headers: corsHeaders() }
      );
    }

    // Validate coupon code format
    if (!/^[A-Z0-9_-]{3,20}$/i.test(body.code)) {
      return NextResponse.json(
        { success: false, error: 'Invalid coupon code format. Use 3-20 alphanumeric characters, hyphens, or underscores.' },
        { status: 400, headers: corsHeaders() }
      );
    }

    // Check if code already exists
    const { data: existing } = await supabase
      .from('coupons')
      .select('id')
      .eq('code', body.code)
      .single();

    if (existing) {
      return NextResponse.json(
        { success: false, error: 'Coupon code already exists' },
        { status: 409, headers: corsHeaders() }
      );
    }

    const newCouponData = {
      code: body.code,
      discountType: body.discountType,
      couponAmount: body.couponAmount || 0,
      allowFreeShipping: body.allowFreeShipping || false,
      expiryDate: body.expiryDate,
      maximumSpend: body.maximumSpend,
      individualUseOnly: body.individualUseOnly || false,
      excludeSaleItems: body.excludeSaleItems || false,
      products: body.products || [],
      excludeProducts: body.excludeProducts || [],
      productCategories: body.productCategories || [],
      excludeCategories: body.excludeCategories || [],
      allowedEmails: body.allowedEmails || [],
      productBrands: body.productBrands || [],
      excludeBrands: body.excludeBrands || [],
      usageLimitPerCoupon: body.usageLimitPerCoupon,
      usageLimitPerUser: body.usageLimitPerUser,
      currentUsage: 0,
      updatedAt: new Date().toISOString(),
    };

    const { data: newCoupon, error } = await supabase
      .from('coupons')
      .insert(newCouponData)
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ success: true, data: newCoupon }, { status: 201, headers: corsHeaders() });
  } catch (error) {
    console.error('Error creating coupon:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create coupon' },
      { status: 500, headers: corsHeaders() }
    );
  }
}
