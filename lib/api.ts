import { Coupon, CreateCouponInput, UpdateCouponInput } from '@/types/coupon';

const API_BASE = '/api/coupons';

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export const CouponAPI = {
  async getAll(): Promise<Coupon[]> {
    const response = await fetch(API_BASE);
    const result: ApiResponse<Coupon[]> = await response.json();
    
    if (!result.success) {
      throw new Error(result.error || 'Failed to fetch coupons');
    }
    
    return result.data || [];
  },

  async getById(id: string): Promise<Coupon> {
    const response = await fetch(`${API_BASE}/${id}`);
    const result: ApiResponse<Coupon> = await response.json();
    
    if (!result.success) {
      throw new Error(result.error || 'Failed to fetch coupon');
    }
    
    if (!result.data) {
      throw new Error('Coupon not found');
    }
    
    return result.data;
  },

  async create(data: CreateCouponInput): Promise<Coupon> {
    const response = await fetch(API_BASE, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    
    const result: ApiResponse<Coupon> = await response.json();
    
    if (!result.success) {
      throw new Error(result.error || 'Failed to create coupon');
    }
    
    if (!result.data) {
      throw new Error('No data returned');
    }
    
    return result.data;
  },

  async update(id: string, data: UpdateCouponInput): Promise<Coupon> {
    const response = await fetch(`${API_BASE}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    
    const result: ApiResponse<Coupon> = await response.json();
    
    if (!result.success) {
      throw new Error(result.error || 'Failed to update coupon');
    }
    
    if (!result.data) {
      throw new Error('No data returned');
    }
    
    return result.data;
  },

  async delete(id: string): Promise<void> {
    const response = await fetch(`${API_BASE}/${id}`, {
      method: 'DELETE',
    });
    
    const result: ApiResponse<void> = await response.json();
    
    if (!result.success) {
      throw new Error(result.error || 'Failed to delete coupon');
    }
  },
};
