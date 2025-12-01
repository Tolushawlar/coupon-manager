import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    const { data: coupon, error } = await supabase
      .from('coupons')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !coupon) {
      return NextResponse.json(
        { success: false, error: 'Coupon not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: coupon });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch coupon' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    // If code is being updated, validate it
    if (body.code) {
      if (!/^[A-Z0-9_-]{3,20}$/i.test(body.code)) {
        return NextResponse.json(
          { success: false, error: 'Invalid coupon code format' },
          { status: 400 }
        );
      }

      // Check if new code conflicts with existing coupons
      const { data: existing } = await supabase
        .from('coupons')
        .select('id')
        .eq('code', body.code)
        .neq('id', id)
        .single();

      if (existing) {
        return NextResponse.json(
          { success: false, error: 'Coupon code already exists' },
          { status: 409 }
        );
      }
    }

    const updateData = {
      ...body,
      updatedAt: new Date().toISOString(),
    };

    // Remove fields that shouldn't be updated directly or don't exist in DB if passed
    delete updateData.id;
    delete updateData.createdAt;

    const { data: updatedCoupon, error } = await supabase
      .from('coupons')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error || !updatedCoupon) {
      return NextResponse.json(
        { success: false, error: 'Coupon not found or update failed' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: updatedCoupon });
  } catch (error) {
    console.error('Error updating coupon:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update coupon' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    const { error } = await supabase
      .from('coupons')
      .delete()
      .eq('id', id);

    if (error) {
      return NextResponse.json(
        { success: false, error: 'Failed to delete coupon' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, message: 'Coupon deleted successfully' });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to delete coupon' },
      { status: 500 }
    );
  }
}
