'use client';

import { Coupon } from '@/types/coupon';

interface CouponCardProps {
  coupon: Coupon;
  onEdit: (coupon: Coupon) => void;
  onDelete: (id: string) => void;
}

export default function CouponCard({ coupon, onEdit, onDelete }: CouponCardProps) {
  const isExpired = coupon.expiryDate && new Date(coupon.expiryDate) < new Date();
  const hasUsageLimit = coupon.usageLimitPerCoupon !== undefined;
  const usagePercentage = hasUsageLimit
    ? (coupon.currentUsage / coupon.usageLimitPerCoupon!) * 100
    : 0;

  const getDiscountLabel = () => {
    switch (coupon.discountType) {
      case 'percentage':
        return `${coupon.couponAmount}% OFF`;
      case 'fixed_cart':
        return `$${coupon.couponAmount} OFF CART`;
      case 'fixed_product':
        return `$${coupon.couponAmount} OFF PRODUCT`;
    }
  };

  const getDiscountIcon = () => {
    switch (coupon.discountType) {
      case 'percentage':
        return '📊';
      case 'fixed_cart':
        return '🛒';
      case 'fixed_product':
        return '🏷️';
    }
  };

  return (
    <div className="glass-card p-6 fade-in">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl">{getDiscountIcon()}</span>
            <h3 className="text-xl font-bold text-white">{coupon.code}</h3>
            {isExpired && (
              <span className="badge badge-danger">⏰ Expired</span>
            )}
            {coupon.individualUseOnly && (
              <span className="badge badge-primary">🎯 Individual Use</span>
            )}
          </div>
          <div className="text-2xl font-bold text-gradient">
            {getDiscountLabel()}
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="space-y-2 mb-4">
        {coupon.allowFreeShipping && (
          <div className="flex items-center gap-2 text-sm text-green-400">
            <span>✓</span>
            <span>Free Shipping Included</span>
          </div>
        )}
        {coupon.excludeSaleItems && (
          <div className="flex items-center gap-2 text-sm text-orange-400">
            <span>⚠️</span>
            <span>Excludes Sale Items</span>
          </div>
        )}
        {coupon.maximumSpend && (
          <div className="flex items-center gap-2 text-sm text-blue-400">
            <span>💰</span>
            <span>Max Spend: ${coupon.maximumSpend}</span>
          </div>
        )}
        {coupon.expiryDate && !isExpired && (
          <div className="flex items-center gap-2 text-sm text-purple-400">
            <span>📅</span>
            <span>Expires: {new Date(coupon.expiryDate).toLocaleDateString()}</span>
          </div>
        )}
      </div>

      {/* Restrictions */}
      {(coupon.productCategories.length > 0 ||
        coupon.productBrands.length > 0 ||
        coupon.allowedEmails.length > 0) && (
        <div className="mb-4">
          <div className="text-xs font-semibold text-gray-400 mb-2">RESTRICTIONS:</div>
          <div className="space-y-1">
            {coupon.productCategories.length > 0 && (
              <div className="text-xs text-gray-400">
                📦 Categories: {coupon.productCategories.slice(0, 3).join(', ')}
                {coupon.productCategories.length > 3 && ` +${coupon.productCategories.length - 3} more`}
              </div>
            )}
            {coupon.productBrands.length > 0 && (
              <div className="text-xs text-gray-400">
                🏷️ Brands: {coupon.productBrands.slice(0, 3).join(', ')}
                {coupon.productBrands.length > 3 && ` +${coupon.productBrands.length - 3} more`}
              </div>
            )}
            {coupon.allowedEmails.length > 0 && (
              <div className="text-xs text-gray-400">
                📧 Email Restricted ({coupon.allowedEmails.length} emails)
              </div>
            )}
          </div>
        </div>
      )}

      {/* Usage Stats */}
      <div className="mb-4">
        <div className="flex items-center justify-between text-sm mb-2">
          <span className="text-gray-400">Usage Statistics</span>
          <span className="text-white font-semibold">
            {coupon.currentUsage}
            {hasUsageLimit && ` / ${coupon.usageLimitPerCoupon}`}
          </span>
        </div>
        {hasUsageLimit && (
          <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-500"
              style={{ width: `${Math.min(usagePercentage, 100)}%` }}
            ></div>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex gap-2 pt-4 border-t border-gray-700">
        <button
          onClick={() => onEdit(coupon)}
          className="btn btn-secondary flex-1"
        >
          ✏️ Edit
        </button>
        <button
          onClick={() => {
            if (confirm(`Are you sure you want to delete coupon "${coupon.code}"?`)) {
              onDelete(coupon.id);
            }
          }}
          className="btn btn-danger flex-1"
        >
          🗑️ Delete
        </button>
      </div>
    </div>
  );
}
