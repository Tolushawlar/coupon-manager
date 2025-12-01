'use client';

import { useState, useEffect } from 'react';
import { Coupon, CreateCouponInput } from '@/types/coupon';
import CouponForm from '@/components/CouponForm';
import CouponCard from '@/components/CouponCard';

export default function Home() {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingCoupon, setEditingCoupon] = useState<Coupon | undefined>();
  const [submitting, setSubmitting] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('all');

  useEffect(() => {
    fetchCoupons();
  }, []);

  const fetchCoupons = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/coupons');
      const data = await response.json();
      if (data.success) {
        setCoupons(data.data);
      }
    } catch (error) {
      console.error('Error fetching coupons:', error);
      alert('Failed to load coupons');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateCoupon = async (data: CreateCouponInput) => {
    try {
      setSubmitting(true);
      const response = await fetch('/api/coupons', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      
      if (result.success) {
        await fetchCoupons();
        setShowForm(false);
        alert('✅ Coupon created successfully!');
      } else {
        alert('❌ ' + result.error);
      }
    } catch (error) {
      console.error('Error creating coupon:', error);
      alert('Failed to create coupon');
    } finally {
      setSubmitting(false);
    }
  };

  const handleUpdateCoupon = async (data: CreateCouponInput) => {
    if (!editingCoupon) return;
    
    try {
      setSubmitting(true);
      const response = await fetch(`/api/coupons/${editingCoupon.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      
      if (result.success) {
        await fetchCoupons();
        setEditingCoupon(undefined);
        setShowForm(false);
        alert('✅ Coupon updated successfully!');
      } else {
        alert('❌ ' + result.error);
      }
    } catch (error) {
      console.error('Error updating coupon:', error);
      alert('Failed to update coupon');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteCoupon = async (id: string) => {
    try {
      const response = await fetch(`/api/coupons/${id}`, {
        method: 'DELETE',
      });
      const result = await response.json();
      
      if (result.success) {
        await fetchCoupons();
        alert('✅ Coupon deleted successfully!');
      } else {
        alert('❌ ' + result.error);
      }
    } catch (error) {
      console.error('Error deleting coupon:', error);
      alert('Failed to delete coupon');
    }
  };

  const handleEditClick = (coupon: Coupon) => {
    setEditingCoupon(coupon);
    setShowForm(true);
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingCoupon(undefined);
  };

  const filteredCoupons = coupons.filter((coupon) => {
    const matchesSearch = coupon.code.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || coupon.discountType === filterType;
    return matchesSearch && matchesType;
  });

  const stats = {
    total: coupons.length,
    active: coupons.filter(c => !c.expiryDate || new Date(c.expiryDate) >= new Date()).length,
    expired: coupons.filter(c => c.expiryDate && new Date(c.expiryDate) < new Date()).length,
  };

  return (
    <div className="gradient-bg min-h-screen flex flex-col items-center">
      <div className="container mx-auto px-4 py-8 max-w-5xl w-full">
        {/* Header */}
        <header className="mb-8 text-center">
          <h1 className="text-5xl font-bold mb-3 glow-text">
            <span className="text-gradient">🎟️ Coupon Manager</span>
          </h1>
          <p className="text-gray-400 text-lg">
            Manage your discount coupons with comprehensive control
          </p>
        </header>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="glass-card p-6 text-center">
            <div className="text-4xl font-bold text-gradient mb-2">{stats.total}</div>
            <div className="text-gray-400">Total Coupons</div>
          </div>
          <div className="glass-card p-6 text-center">
            <div className="text-4xl font-bold text-green-400 mb-2">{stats.active}</div>
            <div className="text-gray-400">Active Coupons</div>
          </div>
          <div className="glass-card p-6 text-center">
            <div className="text-4xl font-bold text-red-400 mb-2">{stats.expired}</div>
            <div className="text-gray-400">Expired Coupons</div>
          </div>
        </div>

        {/* Controls */}
        <div className="glass-card p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="flex-1 w-full">
              <input
                type="text"
                className="input-field"
                placeholder="🔍 Search coupons by code..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-4 w-full md:w-auto">
              <select
                className="select-field flex-1 md:w-48"
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
              >
                <option value="all">All Types</option>
                <option value="percentage">📊 Percentage</option>
                <option value="fixed_cart">🛒 Fixed Cart</option>
                <option value="fixed_product">🏷️ Fixed Product</option>
              </select>
              <button
                className="btn btn-primary whitespace-nowrap"
                onClick={() => {
                  setEditingCoupon(undefined);
                  setShowForm(true);
                }}
              >
                ➕ Create Coupon
              </button>
            </div>
          </div>
        </div>

        {/* Form Modal */}
        {showForm && (
          <div className="modal-overlay" onClick={(e) => {
            if (e.target === e.currentTarget) handleCancelForm();
          }}>
            <div className="modal-content w-full max-w-3xl m-4">
              <div className="glass-card p-6 md:p-8">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl md:text-3xl font-bold text-gradient">
                    {editingCoupon ? '✏️ Edit Coupon' : '➕ Create New Coupon'}
                  </h2>
                  <button 
                    onClick={handleCancelForm}
                    className="text-gray-400 hover:text-white transition-colors text-xl"
                  >
                    ✕
                  </button>
                </div>
                <CouponForm
                  coupon={editingCoupon}
                  onSubmit={editingCoupon ? handleUpdateCoupon : handleCreateCoupon}
                  onCancel={handleCancelForm}
                  isLoading={submitting}
                />
              </div>
            </div>
          </div>
        )}

        {/* Coupons Grid */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="spinner"></div>
          </div>
        ) : filteredCoupons.length === 0 ? (
          <div className="glass-card p-12 text-center max-w-2xl mx-auto">
            <div className="text-6xl mb-6 animate-bounce">🎟️</div>
            <h3 className="text-2xl font-bold text-white mb-3">
              {searchTerm || filterType !== 'all' ? 'No coupons found' : 'No coupons yet'}
            </h3>
            <p className="text-gray-400 mb-8 text-lg">
              {searchTerm || filterType !== 'all'
                ? 'Try adjusting your search or filters to find what you need'
                : 'Get started by creating your first discount coupon'}
            </p>
            {!searchTerm && filterType === 'all' && (
              <button
                className="btn btn-primary btn-lg"
                onClick={() => {
                  setEditingCoupon(undefined);
                  setShowForm(true);
                }}
              >
                ➕ Create Your First Coupon
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCoupons.map((coupon) => (
              <CouponCard
                key={coupon.id}
                coupon={coupon}
                onEdit={handleEditClick}
                onDelete={handleDeleteCoupon}
              />
            ))}
          </div>
        )}

        {/* Footer */}
        <footer className="mt-12 text-center text-gray-500 text-sm">
          <p>Built with Next.js, TypeScript, and Tailwind CSS</p>
        </footer>
      </div>
    </div>
  );
}
