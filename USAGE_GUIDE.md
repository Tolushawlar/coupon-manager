# 📘# Coupon Manager Usage Guide

## 🚀 Supabase Setup (Required)

This application now uses Supabase for data persistence. Follow these steps to set it up:

1.  **Create a Supabase Project**: Go to [supabase.com](https://supabase.com) and create a new project.
2.  **Get Credentials**: Go to Project Settings -> API and copy the `URL` and `anon` public key.
3.  **Environment Variables**: Create a `.env.local` file in the root directory:
    ```env
    NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
    NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
    ```
4.  **Database Schema**: Run the SQL script found in `supabase/schema.sql` in your Supabase SQL Editor to create the necessary tables.
5.  **Install Dependencies**: Run `npm install` or `pnpm install` to ensure `@supabase/supabase-js` is installed.

---

## Table of Contents

1. [Getting Started](#getting-started)
2. [Creating Coupons](#creating-coupons)
3. [Managing Coupons](#managing-coupons)
4. [Understanding Fields](#understanding-fields)
5. [Best Practices](#best-practices)

## Getting Started

### Accessing the Application

Once the development server is running, open your browser to:

```
http://localhost:3000
```

### Dashboard Overview

The main dashboard displays:

- **Statistics Cards**: Total, Active, and Expired coupons
- **Search Bar**: Find coupons by code
- **Filter Dropdown**: Filter by discount type
- **Create Button**: Add new coupons
- **Coupon Grid**: Display all coupons in cards

## Creating Coupons

### Step 1: Open the Form

Click the **"➕ Create Coupon"** button in the top-right section.

### Step 2: Basic Information

#### Coupon Code (Required)

- **Format**: 3-20 characters
- **Allowed**: Letters, numbers, hyphens, underscores
- **Example**: `SAVE20`, `SUMMER-SALE`, `NEW_USER_50`
- **Tip**: Use descriptive codes that customers will remember

#### Discount Type (Required)

Choose one of three discount types:

1. **📊 Percentage Discount**

   - Applies a percentage off the order
   - Example: 20% off entire order
   - Best for: General promotions

2. **🛒 Fixed Cart Discount**

   - Applies a fixed amount off the cart total
   - Example: $10 off orders over $50
   - Best for: Minimum purchase promotions

3. **🏷️ Fixed Product Discount**
   - Applies a fixed amount off specific products
   - Example: $5 off specific items
   - Best for: Product-specific promotions

#### Coupon Amount

- **For Percentage**: Enter the percentage (e.g., `20` for 20%)
- **For Fixed**: Enter the dollar amount (e.g., `10.00` for $10)

### Step 3: Shipping & Expiry

#### Allow Free Shipping

- ☑️ Check this box to grant free shipping
- Requires: A free shipping method configured in your shipping zone
- Note: Applies only when this coupon is used

#### Expiry Date

- **Optional field**
- Set a date when the coupon should expire
- After this date, the coupon cannot be used
- Format: YYYY-MM-DD (uses date picker)

### Step 4: Spending Limits

#### Maximum Spend

- **Optional field**
- Sets a maximum order total for coupon usage
- Example: Coupon only works on orders up to $100
- Useful for: Preventing excessive discounts

### Step 5: Usage Restrictions

#### Individual Use Only

- ☑️ Check to prevent stacking with other coupons
- When enabled: Customers can only use this coupon alone
- When disabled: Can be combined with other coupons

#### Exclude Sale Items

- ☑️ Check to exclude already discounted items
- **For Per-Item Coupons**: Item must not be on sale
- **For Cart Coupons**: Some non-sale items must be in cart

### Step 6: Product Targeting

#### Products

- Enter specific product SKUs or IDs
- **Format**: Comma-separated list
- **Example**: `PROD-001, PROD-002, SHOE-123`
- Coupon applies ONLY to these products

#### Exclude Products

- Enter product SKUs or IDs to exclude
- **Format**: Comma-separated list
- These products won't get the discount
- Useful for: Excluding new arrivals or premium items

### Step 7: Category Restrictions

#### Product Categories

Select categories to include:

- Bear Archery
- Merch
- Mizuno Volleyball
- Uncategorized
- 🏈 Football
- 🏋️ In-Home Gym
- 🏓 Pickleball & Disc Golf
- 🏹 Hunting/Fishing (no firearms)
- 🛶 Outdoor & Water Sports
- 🛹 Skateboarding/BMX
- 🥎 Baseball/Softball

**Tip**: Check multiple categories to apply discount across product lines

#### Exclude Categories

- Same list as above
- Select categories to exclude from the discount
- Overrides product category inclusions

### Step 8: Email Restrictions

#### Allowed Emails

- Restrict coupon usage to specific email addresses
- **Format**: Comma-separated list
- **Example**: `vip@example.com, premium@example.com`
- Use cases:
  - VIP customer rewards
  - Influencer-specific codes
  - Employee discounts

### Step 9: Brand Restrictions

#### Product Brands

Select brands to include:

- Energy Gym
- Gym Sports
- Healthy
- Power Fitness Club
- The Fitness Center
- Victor Gym

#### Exclude Brands

- Same list as above
- Select brands to exclude from discount

### Step 10: Usage Limits

#### Usage Limit per Coupon

- **Optional field**
- Total number of times the coupon can be used
- **Example**: `100` means coupon expires after 100 uses
- Leave blank for unlimited usage

#### Usage Limit per User

- **Optional field**
- Number of times each customer can use the coupon
- **Example**: `1` for one-time use per customer
- **Example**: `5` for up to 5 uses per customer

### Step 11: Save

Click **"💾 Create Coupon"** to save your coupon.

## Managing Coupons

### Viewing Coupons

All coupons are displayed in a grid layout with:

- Coupon code and discount badge
- Active features (free shipping, restrictions)
- Expiry date (if set)
- Usage statistics with progress bar
- Actions (Edit, Delete)

### Editing Coupons

1. Click **"✏️ Edit"** on any coupon card
2. Modify the fields you want to change
3. Click **"💾 Update Coupon"**

### Deleting Coupons

1. Click **"🗑️ Delete"** on the coupon card
2. Confirm the deletion in the popup
3. Coupon is permanently removed

### Searching Coupons

- Use the search bar to find coupons by code
- Search is case-insensitive
- Results update in real-time

### Filtering Coupons

Use the dropdown filter to show:

- **All Types**: Shows all coupons
- **📊 Percentage**: Only percentage discounts
- **🛒 Fixed Cart**: Only fixed cart discounts
- **🏷️ Fixed Product**: Only fixed product discounts

## Understanding Fields

### Status Badges

#### ⏰ Expired

- Shown on coupons past their expiry date
- These coupons can no longer be used

#### 🎯 Individual Use

- Indicates the coupon cannot be stacked
- Must be used alone

### Coupon Card Features

#### Free Shipping Indicator

- ✓ Shows when free shipping is included
- Green text for easy recognition

#### Sale Item Exclusion

- ⚠️ Warning indicator
- Shows coupon excludes sale items

#### Maximum Spend

- 💰 Shows spending limit
- Displayed in blue

#### Expiry Date

- 📅 Calendar icon
- Shows formatted date
- Only appears if expiry is set

### Usage Statistics

- **Progress Bar**: Visual representation of usage
- **Fraction Display**: Current uses / Total limit
- **Color Coding**:
  - Green to purple gradient
  - Full bar indicates limit reached

## Best Practices

### Coupon Naming

✅ **DO**:

- Use clear, memorable codes
- Include the discount in the name (`SAVE20`)
- Use seasonal identifiers (`SUMMER2025`)

❌ **DON'T**:

- Use overly complex codes
- Make codes too similar to existing ones
- Use profanity or offensive terms

### Discount Strategies

#### New Customer Acquisition

```
Code: WELCOME10
Type: Percentage
Amount: 10%
Usage: 1 per user
```

#### Seasonal Promotions

```
Code: SUMMER25
Type: Percentage
Amount: 25%
Expiry: End of summer
Categories: Summer sports equipment
```

#### Cart Value Incentives

```
Code: SAVE10
Type: Fixed Cart
Amount: $10
Maximum Spend: $100
```

#### Category-Specific Sales

```
Code: GYM50
Type: Percentage
Amount: 50%
Categories: In-Home Gym
Exclude: Sale items
```

#### VIP Rewards

```
Code: VIP2025
Type: Percentage
Amount: 30%
Allowed Emails: vip-customers.txt
Individual Use: Yes
```

### Testing Recommendations

1. **Always Test New Coupons**

   - Create with small values first
   - Test all restrictions
   - Verify expiry dates work correctly

2. **Monitor Usage**

   - Check usage statistics regularly
   - Adjust limits if needed
   - Track which coupons perform best

3. **Set Appropriate Limits**
   - Use per-user limits to prevent abuse
   - Set per-coupon limits for budget control
   - Consider maximum spend for high-value discounts

### Security Tips

1. **Protect High-Value Coupons**

   - Use email restrictions
   - Set usage limits
   - Make codes less guessable

2. **Prevent Stacking**

   - Enable "Individual Use Only"
   - Monitor for coupon abuse
   - Set maximum spend limits

3. **Regular Maintenance**
   - Delete expired coupons
   - Update usage limits
   - Review restriction effectiveness

## Troubleshooting

### Coupon Code Already Exists

- Each code must be unique
- Try a different variation
- Check for typos in similar codes

### Cannot Save Coupon

- Ensure required fields are filled
- Check code format (3-20 characters)
- Verify discount amount is valid

### Coupon Not Appearing

- Check filter settings
- Clear search bar
- Refresh the page

### Usage Limit Not Working

- Verify the field is set (not blank)
- Check current usage vs. limit
- Ensure number is positive

---

## Need Help?

For technical issues or feature requests, please refer to the main README.md file or check the API documentation.

**Happy Coupon Managing! 🎉**
