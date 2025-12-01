# 🎟️ Coupon Manager - Advanced Discount Management System

A comprehensive Next.js application for managing discount coupons with full CRUD operations, advanced filtering, and usage tracking.

## 🚀 Features

### Discount Types
- **📊 Percentage Discount** - Apply a percentage-based discount
- **🛒 Fixed Cart Discount** - Apply a fixed amount discount to the entire cart
- **🏷️ Fixed Product Discount** - Apply a fixed amount discount to specific products

### Comprehensive Coupon Configuration
- ✅ **Coupon Code Management** - Create unique coupon codes
- 💰 **Flexible Discount Amounts** - Set percentage or fixed amount discounts
- 🚚 **Free Shipping Option** - Enable free shipping with coupons
- 📅 **Expiry Dates** - Set optional expiration dates
- 💵 **Maximum Spend Limits** - Control maximum purchase amounts
- 🎯 **Individual Use Only** - Prevent stacking with other coupons
- ❌ **Exclude Sale Items** - Option to exclude already discounted items

### Advanced Restrictions
- **Product Targeting**
  - Include specific products by SKU/ID
  - Exclude specific products
  
- **Category Filters**
  - Include specific product categories
  - Exclude specific categories
  - Supports 11 predefined categories including Sports, Gym Equipment, and more

- **Brand Restrictions**
  - Target specific brands
  - Exclude specific brands
  - 6 predefined brands available

- **Email Restrictions**
  - Limit coupon usage to specific email addresses

### Usage Controls
- 📊 **Usage Limit per Coupon** - Total number of times a coupon can be used
- 👤 **Usage Limit per User** - Number of times each user can use the coupon
- 📈 **Real-time Usage Tracking** - Monitor current usage with progress bars

## 🛠️ Technology Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + Custom CSS
- **API**: Next.js API Routes (REST)
- **Database**: In-memory (easily replaceable with PostgreSQL, MongoDB, etc.)

## 📁 Project Structure

```
coupon-manager/
├── app/
│   ├── api/
│   │   └── coupons/
│   │       ├── route.ts          # GET all, POST create
│   │       └── [id]/
│   │           └── route.ts      # GET by ID, PUT update, DELETE
│   ├── layout.tsx                 # Root layout
│   ├── page.tsx                   # Main application page
│   └── globals.css                # Custom styles
├── components/
│   ├── CouponForm.tsx             # Comprehensive coupon form
│   └── CouponCard.tsx             # Coupon display card
├── lib/
│   └── db.ts                      # Database service
└── types/
    └── coupon.ts                  # TypeScript types
```

## 🚦 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Navigate to the project directory:
```bash
cd /Applications/MAMP/htdocs/coupon-manager
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📡 API Endpoints

### Get All Coupons
```http
GET /api/coupons
```

**Response:**
```json
{
  "success": true,
  "data": [...]
}
```

### Get Coupon by ID
```http
GET /api/coupons/:id
```

### Create Coupon
```http
POST /api/coupons
Content-Type: application/json

{
  "code": "SAVE20",
  "discountType": "percentage",
  "couponAmount": 20,
  "allowFreeShipping": false,
  "individualUseOnly": false,
  "excludeSaleItems": false,
  ...
}
```

### Update Coupon
```http
PUT /api/coupons/:id
Content-Type: application/json

{
  "couponAmount": 25,
  ...
}
```

### Delete Coupon
```http
DELETE /api/coupons/:id
```

## 🎨 Design Features

- **🌙 Dark Mode** - Beautiful dark theme with gradients
- **✨ Glassmorphism** - Modern glass-effect cards
- **🎭 Smooth Animations** - Micro-interactions and transitions
- **📱 Responsive Design** - Works on all device sizes
- **🎨 Custom Color Palette** - HSL-based design system
- **⚡ Performance Optimized** - Fast loading and interactions

## 🔧 Customization

### Adding a Database

Replace the in-memory database in `lib/db.ts` with your preferred database:

```typescript
// Example: PostgreSQL with Prisma
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export class CouponDatabase {
  static async getAll() {
    return await prisma.coupon.findMany();
  }
  // ... other methods
}
```

### Adding Categories/Brands

Edit `types/coupon.ts`:

```typescript
export const CATEGORIES = [
  'Your Category 1',
  'Your Category 2',
  // ...
] as const;

export const BRANDS = [
  'Your Brand 1',
  'Your Brand 2',
  // ...
] as const;
```

## 🧪 Testing the Application

1. **Create a Coupon**:
   - Click "➕ Create Coupon"
   - Fill in the required fields (Code, Discount Type)
   - Set optional restrictions
   - Click "💾 Create Coupon"

2. **Edit a Coupon**:
   - Click "✏️ Edit" on any coupon card
   - Modify the fields
   - Click "💾 Update Coupon"

3. **Delete a Coupon**:
   - Click "🗑️ Delete" on any coupon card
   - Confirm the deletion

4. **Search & Filter**:
   - Use the search bar to find coupons by code
   - Use the dropdown to filter by discount type

## 📊 Statistics Dashboard

The application displays real-time statistics:
- Total number of coupons
- Active coupons (not expired)
- Expired coupons

## 🔒 Validation

- Coupon codes must be 3-20 characters (alphanumeric, hyphens, underscores)
- Duplicate codes are prevented
- Required fields are validated
- Expiry dates are checked

## 🚀 Production Deployment

### Build for production:
```bash
npm run build
```

### Start production server:
```bash
npm run start
```

### Deploy to Vercel:
```bash
vercel deploy
```

## 📝 License

This project is open source and available for educational and commercial use.

## 🤝 Contributing

Feel free to submit issues and enhancement requests!

---

Built with ❤️ using Next.js, TypeScript, and Tailwind CSS
