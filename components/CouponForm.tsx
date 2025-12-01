'use client';

import { useState, FormEvent } from 'react';
import { Coupon, CreateCouponInput, CATEGORIES, BRANDS, DiscountType } from '@/types/coupon';

interface CouponFormProps {
  coupon?: Coupon;
  onSubmit: (data: CreateCouponInput) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
}

export default function CouponForm({ coupon, onSubmit, onCancel, isLoading }: CouponFormProps) {
  const [formData, setFormData] = useState<CreateCouponInput>({
    code: coupon?.code || '',
    discountType: coupon?.discountType || 'percentage',
    couponAmount: coupon?.couponAmount || 0,
    allowFreeShipping: coupon?.allowFreeShipping || false,
    expiryDate: coupon?.expiryDate || '',
    maximumSpend: coupon?.maximumSpend,
    individualUseOnly: coupon?.individualUseOnly || false,
    excludeSaleItems: coupon?.excludeSaleItems || false,
    products: coupon?.products || [],
    excludeProducts: coupon?.excludeProducts || [],
    productCategories: coupon?.productCategories || [],
    excludeCategories: coupon?.excludeCategories || [],
    allowedEmails: coupon?.allowedEmails || [],
    productBrands: coupon?.productBrands || [],
    excludeBrands: coupon?.excludeBrands || [],
    usageLimitPerCoupon: coupon?.usageLimitPerCoupon,
    usageLimitPerUser: coupon?.usageLimitPerUser,
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
  };

  const toggleArrayItem = (array: string[], item: string) => {
    return array.includes(item)
      ? array.filter((i) => i !== item)
      : [...array, item];
  };

  const handleEmailsChange = (value: string) => {
    const emails = value.split(',').map((e) => e.trim()).filter((e) => e);
    setFormData({ ...formData, allowedEmails: emails });
  };

  const handleProductsChange = (value: string) => {
    const products = value.split(',').map((e) => e.trim()).filter((e) => e);
    setFormData({ ...formData, products });
  };

  const handleExcludeProductsChange = (value: string) => {
    const products = value.split(',').map((e) => e.trim()).filter((e) => e);
    setFormData({ ...formData, excludeProducts: products });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      
      {/* Section: General Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-white border-b border-gray-700 pb-2">📝 General Information</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Coupon Code */}
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-300">
              Coupon Code <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              required
              className="input-field font-mono text-lg"
              value={formData.code}
              onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
              placeholder="e.g., SAVE20"
            />
            <p className="text-xs text-gray-500 mt-1">3-20 characters, alphanumeric</p>
          </div>

          {/* Expiry Date */}
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-300">
              Expiry Date
            </label>
            <input
              type="date"
              className="input-field"
              value={formData.expiryDate}
              onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
            />
          </div>
        </div>

        {/* Discount Type */}
        <div>
          <label className="block text-sm font-semibold mb-3 text-gray-300">
            Discount Type <span className="text-red-400">*</span>
          </label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {(['percentage', 'fixed_cart', 'fixed_product'] as DiscountType[]).map((type) => (
              <label key={type} className="cursor-pointer group">
                <input
                  type="radio"
                  name="discountType"
                  value={type}
                  checked={formData.discountType === type}
                  onChange={(e) => setFormData({ ...formData, discountType: e.target.value as DiscountType })}
                  className="sr-only"
                />
                <div
                  className={`p-4 rounded-2xl border-2 transition-all duration-200 flex flex-col items-center text-center gap-2 ${
                    formData.discountType === type
                      ? 'border-purple-500 bg-purple-500/10 shadow-[0_0_15px_rgba(168,85,247,0.2)]'
                      : 'border-gray-700 bg-gray-800/50 hover:border-gray-500 hover:bg-gray-800'
                  }`}
                >
                  <div className="text-2xl">
                    {type === 'percentage' && '📊'}
                    {type === 'fixed_cart' && '🛒'}
                    {type === 'fixed_product' && '🏷️'}
                  </div>
                  <div className={`font-semibold ${formData.discountType === type ? 'text-white' : 'text-gray-400 group-hover:text-gray-200'}`}>
                    {type === 'percentage' && 'Percentage'}
                    {type === 'fixed_cart' && 'Fixed Cart'}
                    {type === 'fixed_product' && 'Fixed Product'}
                  </div>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Coupon Amount & Max Spend */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-300">
              Coupon Amount <span className="text-red-400">*</span>
            </label>
            <div className="relative">
              <input
                type="number"
                min="0"
                step="0.01"
                className="input-field pl-8"
                value={formData.couponAmount}
                onChange={(e) => setFormData({ ...formData, couponAmount: parseFloat(e.target.value) })}
                placeholder="0.00"
              />
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                {formData.discountType === 'percentage' ? '%' : '$'}
              </span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-300">
              Maximum Spend
            </label>
            <div className="relative">
              <input
                type="number"
                min="0"
                step="0.01"
                className="input-field pl-8"
                value={formData.maximumSpend || ''}
                onChange={(e) => setFormData({ ...formData, maximumSpend: e.target.value ? parseFloat(e.target.value) : undefined })}
                placeholder="No limit"
              />
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
            </div>
          </div>
        </div>
      </div>

      {/* Section: Restrictions */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-white border-b border-gray-700 pb-2">🚫 Restrictions & Limits</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3 bg-gray-800/30 p-4 rounded-2xl border border-gray-700">
            <h4 className="font-semibold text-gray-300 text-sm">Usage Options</h4>
            
            <div className="checkbox-wrapper">
              <input
                type="checkbox"
                id="allowFreeShipping"
                className="checkbox-custom"
                checked={formData.allowFreeShipping}
                onChange={(e) => setFormData({ ...formData, allowFreeShipping: e.target.checked })}
              />
              <label htmlFor="allowFreeShipping" className="text-sm text-gray-300 cursor-pointer hover:text-white">
                🚚 Allow Free Shipping
              </label>
            </div>

            <div className="checkbox-wrapper">
              <input
                type="checkbox"
                id="individualUseOnly"
                className="checkbox-custom"
                checked={formData.individualUseOnly}
                onChange={(e) => setFormData({ ...formData, individualUseOnly: e.target.checked })}
              />
              <label htmlFor="individualUseOnly" className="text-sm text-gray-300 cursor-pointer hover:text-white">
                🎯 Individual Use Only
              </label>
            </div>

            <div className="checkbox-wrapper">
              <input
                type="checkbox"
                id="excludeSaleItems"
                className="checkbox-custom"
                checked={formData.excludeSaleItems}
                onChange={(e) => setFormData({ ...formData, excludeSaleItems: e.target.checked })}
              />
              <label htmlFor="excludeSaleItems" className="text-sm text-gray-300 cursor-pointer hover:text-white">
                ❌ Exclude Sale Items
              </label>
            </div>
          </div>

          <div className="space-y-3 bg-gray-800/30 p-4 rounded-2xl border border-gray-700">
            <h4 className="font-semibold text-gray-300 text-sm">Usage Limits</h4>
            <div>
              <label className="text-xs text-gray-400 block mb-1">Per Coupon (Total Uses)</label>
              <input
                type="number"
                min="0"
                className="input-field text-sm py-1"
                value={formData.usageLimitPerCoupon || ''}
                onChange={(e) =>
                  setFormData({ ...formData, usageLimitPerCoupon: e.target.value ? parseInt(e.target.value) : undefined })
                }
                placeholder="Unlimited"
              />
            </div>
            <div>
              <label className="text-xs text-gray-400 block mb-1">Per User</label>
              <input
                type="number"
                min="0"
                className="input-field text-sm py-1"
                value={formData.usageLimitPerUser || ''}
                onChange={(e) =>
                  setFormData({ ...formData, usageLimitPerUser: e.target.value ? parseInt(e.target.value) : undefined })
                }
                placeholder="Unlimited"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Section: Targeting */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-white border-b border-gray-700 pb-2">🎯 Product Targeting</h3>

        <div className="grid grid-cols-1 gap-6">
          {/* Products */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-300">Include Products</label>
              <input
                type="text"
                className="input-field"
                value={formData.products.join(', ')}
                onChange={(e) => handleProductsChange(e.target.value)}
                placeholder="SKUs: PROD-001, PROD-002"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-300">Exclude Products</label>
              <input
                type="text"
                className="input-field"
                value={formData.excludeProducts.join(', ')}
                onChange={(e) => handleExcludeProductsChange(e.target.value)}
                placeholder="SKUs: PROD-003, PROD-004"
              />
            </div>
          </div>

          {/* Categories */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-300">Include Categories</label>
              <div className="multi-select h-48">
                {CATEGORIES.map((category) => (
                  <div key={category} className="multi-select-item checkbox-wrapper">
                    <input
                      type="checkbox"
                      id={`cat-${category}`}
                      className="checkbox-custom"
                      checked={formData.productCategories.includes(category)}
                      onChange={() =>
                        setFormData({
                          ...formData,
                          productCategories: toggleArrayItem(formData.productCategories, category),
                        })
                      }
                    />
                    <label htmlFor={`cat-${category}`} className="text-sm text-gray-300 cursor-pointer flex-1">
                      {category}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-300">Exclude Categories</label>
              <div className="multi-select h-48">
                {CATEGORIES.map((category) => (
                  <div key={category} className="multi-select-item checkbox-wrapper">
                    <input
                      type="checkbox"
                      id={`exc-cat-${category}`}
                      className="checkbox-custom"
                      checked={formData.excludeCategories.includes(category)}
                      onChange={() =>
                        setFormData({
                          ...formData,
                          excludeCategories: toggleArrayItem(formData.excludeCategories, category),
                        })
                      }
                    />
                    <label htmlFor={`exc-cat-${category}`} className="text-sm text-gray-300 cursor-pointer flex-1">
                      {category}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Brands */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-300">Include Brands</label>
              <div className="multi-select h-40">
                {BRANDS.map((brand) => (
                  <div key={brand} className="multi-select-item checkbox-wrapper">
                    <input
                      type="checkbox"
                      id={`brand-${brand}`}
                      className="checkbox-custom"
                      checked={formData.productBrands.includes(brand)}
                      onChange={() =>
                        setFormData({
                          ...formData,
                          productBrands: toggleArrayItem(formData.productBrands, brand),
                        })
                      }
                    />
                    <label htmlFor={`brand-${brand}`} className="text-sm text-gray-300 cursor-pointer flex-1">
                      {brand}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-300">Exclude Brands</label>
              <div className="multi-select h-40">
                {BRANDS.map((brand) => (
                  <div key={brand} className="multi-select-item checkbox-wrapper">
                    <input
                      type="checkbox"
                      id={`exc-brand-${brand}`}
                      className="checkbox-custom"
                      checked={formData.excludeBrands.includes(brand)}
                      onChange={() =>
                        setFormData({
                          ...formData,
                          excludeBrands: toggleArrayItem(formData.excludeBrands, brand),
                        })
                      }
                    />
                    <label htmlFor={`exc-brand-${brand}`} className="text-sm text-gray-300 cursor-pointer flex-1">
                      {brand}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Emails */}
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-300">Allowed Emails</label>
            <input
              type="text"
              className="input-field"
              value={formData.allowedEmails.join(', ')}
              onChange={(e) => handleEmailsChange(e.target.value)}
              placeholder="e.g., user@example.com, admin@example.com"
            />
            <p className="text-xs text-gray-500 mt-1">Comma-separated list</p>
          </div>
        </div>
      </div>

      {/* Form Actions */}
      <div className="flex gap-4 pt-6 border-t border-gray-700 sticky bottom-0 bg-[#1a1a24] p-4 -mx-4 -mb-4 rounded-b-xl">
        <button type="submit" className="btn btn-primary flex-1 py-3 text-lg shadow-lg" disabled={isLoading}>
          {isLoading ? (
            <>
              <div className="spinner w-5 h-5 border-2"></div>
              Saving...
            </>
          ) : (
            <>💾 {coupon ? 'Update Coupon' : 'Create Coupon'}</>
          )}
        </button>
        <button type="button" onClick={onCancel} className="btn btn-secondary px-8" disabled={isLoading}>
          Cancel
        </button>
      </div>
    </form>
  );
}
