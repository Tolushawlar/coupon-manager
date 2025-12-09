"use client";

import { useState } from "react";
import { Coupon } from "@/types/coupon";

interface CouponCardProps {
  coupon: Coupon;
  onEdit: (coupon: Coupon) => void;
  onDelete: (id: string) => void;
}

export default function CouponCard({
  coupon,
  onEdit,
  onDelete,
}: CouponCardProps) {
  const [showEmailsModal, setShowEmailsModal] = useState(false);
  const isExpired =
    coupon.expiryDate && new Date(coupon.expiryDate) < new Date();
  const hasUsageLimit = coupon.usageLimitPerCoupon !== undefined;
  const usagePercentage = hasUsageLimit
    ? (coupon.currentUsage / coupon.usageLimitPerCoupon!) * 100
    : 0;

  const getDiscountLabel = () => {
    switch (coupon.discountType) {
      case "percentage":
        return `${coupon.couponAmount}% OFF`;
      case "fixed_cart":
        return `$${coupon.couponAmount} OFF CART`;
      case "fixed_product":
        return `$${coupon.couponAmount} OFF PRODUCT`;
    }
  };

  const getDiscountIcon = () => {
    switch (coupon.discountType) {
      case "percentage":
        return "📊";
      case "fixed_cart":
        return "🛒";
      case "fixed_product":
        return "🏷️";
    }
  };

  return (
    <div className="glass-card p-6 fade-in" style={{ padding: "15px" }}>
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            {/* <span className="text-2xl">{getDiscountIcon()}</span> */}
            <h3
              className="text-xl font-bold text-white"
              style={{ marginBottom: "5px" }}
            >
              {coupon.code}
            </h3>
            {isExpired && <span className="badge badge-danger">Expired</span>}
            {coupon.individualUseOnly && (
              <span className="badge badge-primary">Individual Use</span>
            )}
          </div>
          <div
            className="text-2xl font-bold text-"
            style={{ marginBottom: "5px" }}
          >
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
            {/* <span>⚠️</span> */}
            <span>Excludes Sale Items</span>
          </div>
        )}
        {coupon.maximumSpend && (
          <div className="flex items-center gap-2 text-sm text-blue-400">
            {/* <span>💰</span> */}
            <span>Max Spend: ${coupon.maximumSpend}</span>
          </div>
        )}
        {coupon.expiryDate && !isExpired && (
          <div className="flex items-center gap-2 text-sm ">
            {/* <span>📅</span> */}
            <span>
              Expires: {new Date(coupon.expiryDate).toLocaleDateString()}
            </span>
          </div>
        )}
      </div>

      {/* Restrictions */}
      {(coupon.productCategories.length > 0 ||
        coupon.productBrands.length > 0 ||
        coupon.allowedEmails.length > 0) && (
        <div className="mb-4">
          {/* <div className="text-xs font-semibold text-gray-400 mb-2">RESTRICTIONS:</div> */}
          <div className="space-y-1">
            {coupon.productCategories.length > 0 && (
              <div className="text-xs text-gray-400">
                📦 Categories: {coupon.productCategories.slice(0, 3).join(", ")}
                {coupon.productCategories.length > 3 &&
                  ` +${coupon.productCategories.length - 3} more`}
              </div>
            )}
            {coupon.productBrands.length > 0 && (
              <div className="text-xs text-gray-400">
                🏷️ Brands: {coupon.productBrands.slice(0, 3).join(", ")}
                {coupon.productBrands.length > 3 &&
                  ` +${coupon.productBrands.length - 3} more`}
              </div>
            )}
            {coupon.allowedEmails.length > 0 && (
              <div
                className="text-xs text-blue-400 cursor-pointer hover:text-blue-300"
                style={{ marginTop: "10px" }}
                onClick={() => setShowEmailsModal(true)}
              >
                👥 ({coupon.allowedEmails.length} Users)
              </div>
            )}
          </div>
        </div>
      )}

      {/* Usage Stats */}
      <div className="mb-4" style={{ padding: "0px", marginTop: "10px" }}>
        <div className="flex items-center justify-between text-sm mb-2">
          <span className="text-gray-400" style={{ marginBottom: "5px" }}>
            Usage Statistics
          </span>
          <span
            className="text-white font-semibold"
            style={{ marginBottom: "5px" }}
          >
            {coupon.currentUsage}
            {hasUsageLimit && ` / ${coupon.usageLimitPerCoupon}`}
          </span>
        </div>
        {hasUsageLimit && (
          <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
            <div
              className="h-full bg-linear-to-r from-purple-500 to-pink-500 transition-all duration-500"
              style={{ width: `${Math.min(usagePercentage, 100)}%` }}
            ></div>
          </div>
        )}
      </div>

      {/* Actions */}
      <div
        className="flex gap-2 pt-4  border-gray-700"
        style={{ padding: "10px", marginTop: "10px" }}
      >
        <button
          onClick={() => onEdit(coupon)}
          className="btn btn-secondary flex-1"
          style={{ width: "40px" }}
        >
          Edit
        </button>
        <button
          onClick={() => {
            if (
              confirm(
                `Are you sure you want to delete coupon "${coupon.code}"?`
              )
            ) {
              onDelete(coupon.id);
            }
          }}
          className="btn btn-danger flex-1"
          style={{ width: "40px" }}
        >
          Delete
        </button>
      </div>

      {/* Emails Modal */}
      {showEmailsModal && (
        <div
          className="modal-overlay"
          onClick={() => setShowEmailsModal(false)}
          style={{ padding: "5px" }}
        >
          <div
            className="modal-content max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="glass-card p-6" style={{ padding: "10px" }}>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-white">Users List</h3>
                <button
                  onClick={() => setShowEmailsModal(false)}
                  className="text-gray-400 hover:text-white text-2xl"
                  style={{ cursor: "pointer" }}
                >
                  ✕
                </button>
              </div>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {coupon.allowedEmails.map((email, index) => (
                  <div
                    key={index}
                    className="p-3 bg-gray-800/50 rounded-lg border border-gray-700 text-gray-300"
                    style={{ padding: "5px", margin: '5px' }}
                  >
                    {email}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
