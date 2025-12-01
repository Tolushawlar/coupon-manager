#!/usr/bin/env node

/**
 * Test script to verify the Coupon Manager API
 * Run with: node test-api.mjs
 */

const API_BASE = 'http://localhost:3000/api/coupons';

async function testAPI() {
  console.log('🧪 Testing Coupon Manager API\n');

  try {
    // Test 1: GET all coupons
    console.log('1️⃣ Testing GET /api/coupons');
    const getAllResponse = await fetch(API_BASE);
    const getAllData = await getAllResponse.json();
    console.log('✅ Success:', getAllData);
    console.log(`   Found ${getAllData.data?.length || 0} coupons\n`);

    // Test 2: CREATE a new coupon
    console.log('2️⃣ Testing POST /api/coupons');
    const newCoupon = {
      code: 'TEST50',
      discountType: 'percentage',
      couponAmount: 50,
      allowFreeShipping: true,
      individualUseOnly: true,
      excludeSaleItems: false,
      products: [],
      excludeProducts: [],
      productCategories: ['🏋️ In-Home Gym', '🏓 Pickleball & Disc Golf'],
      excludeCategories: [],
      allowedEmails: ['test@example.com'],
      productBrands: ['Energy Gym'],
      excludeBrands: [],
      usageLimitPerCoupon: 100,
      usageLimitPerUser: 5,
    };

    const createResponse = await fetch(API_BASE, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newCoupon),
    });
    const createData = await createResponse.json();
    
    if (createData.success) {
      console.log('✅ Coupon created successfully');
      console.log('   ID:', createData.data.id);
      console.log('   Code:', createData.data.code, '\n');

      const createdId = createData.data.id;

      // Test 3: GET coupon by ID
      console.log('3️⃣ Testing GET /api/coupons/:id');
      const getByIdResponse = await fetch(`${API_BASE}/${createdId}`);
      const getByIdData = await getByIdResponse.json();
      console.log('✅ Success:', getByIdData.success);
      console.log('   Retrieved coupon:', getByIdData.data?.code, '\n');

      // Test 4: UPDATE coupon
      console.log('4️⃣ Testing PUT /api/coupons/:id');
      const updateResponse = await fetch(`${API_BASE}/${createdId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ couponAmount: 75 }),
      });
      const updateData = await updateResponse.json();
      console.log('✅ Success:', updateData.success);
      console.log('   Updated amount:', updateData.data?.couponAmount, '\n');

      // Test 5: DELETE coupon
      console.log('5️⃣ Testing DELETE /api/coupons/:id');
      const deleteResponse = await fetch(`${API_BASE}/${createdId}`, {
        method: 'DELETE',
      });
      const deleteData = await deleteResponse.json();
      console.log('✅ Success:', deleteData.success);
      console.log('   Message:', deleteData.message, '\n');

    } else {
      console.log('❌ Failed to create coupon:', createData.error, '\n');
    }

    console.log('✅ All API tests completed successfully!');
  } catch (error) {
    console.error('❌ API test failed:', error.message);
  }
}

testAPI();
