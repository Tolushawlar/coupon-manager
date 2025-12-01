export type DiscountType = 'percentage' | 'fixed_cart' | 'fixed_product';

export interface Coupon {
  id: string;
  code: string;
  discountType: DiscountType;
  couponAmount: number;
  allowFreeShipping: boolean;
  expiryDate?: string;
  maximumSpend?: number;
  individualUseOnly: boolean;
  excludeSaleItems: boolean;
  products: string[];
  excludeProducts: string[];
  productCategories: string[];
  excludeCategories: string[];
  allowedEmails: string[];
  productBrands: string[];
  excludeBrands: string[];
  usageLimitPerCoupon?: number;
  usageLimitPerUser?: number;
  currentUsage: number;
  createdAt: string;
  updatedAt: string;
}

export type CreateCouponInput = Omit<Coupon, 'id' | 'createdAt' | 'updatedAt' | 'currentUsage'>;
export type UpdateCouponInput = Partial<CreateCouponInput>;

export const CATEGORIES = [
  'Bear Archery',
  'Merch',
  'Mizuno Volleyball',
  'Uncategorized',
  '🏈 Football',
  '🏋️ In-Home Gym',
  '🏓 Pickleball & Disc Golf',
  '🏹 Hunting/Fishing (no firearms)',
  '🛶 Outdoor & Water Sports',
  '🛹 Skateboarding/BMX',
  '🥎 Baseball/Softball',
] as const;

export const BRANDS = [
  'Energy Gym',
  'Gym Sports',
  'Healthy',
  'Power Fitness Club',
  'The Fitness Center',
  'Victor Gym',
] as const;
