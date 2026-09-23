import React from 'react';
import { X, Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { GoldRates, Product } from '../types';
import { calculateProductPrice, formatPrice, formatWeight } from '../utils/pricing';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlistProducts: Product[];
  goldRates: GoldRates;
  onRemoveFromWishlist: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onQuickView: (product: Product) => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  wishlistProducts,
  goldRates,
  onRemoveFromWishlist,
  onAddToCart,
  onQuickView,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] overflow-hidden bg-black/50 backdrop-blur-xs">
      <div className="absolute inset-y-0 left-0 max-w-full flex pl-0 sm:pl-10">
        <div className="w-screen max-w-md bg-white border-r border-[#E8E4DA] shadow-2xl flex flex-col justify-between">
          {/* Header */}
          <div className="p-5 border-b border-[#E8E4DA] flex items-center justify-between bg-[#F7F5EE]">
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-[#B8860B] fill-[#B8860B]" />
              <h2 className="text-base font-bold text-[#1C1917]">علاقه‌مندی‌های من</h2>
              <span className="text-xs text-[#78716C]">({wishlistProducts.length} اثر)</span>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full text-[#78716C] hover:text-[#1C1917] hover:bg-[#EAE6DF] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* List */}
          <div className="p-5 overflow-y-auto flex-1 space-y-4">
            {wishlistProducts.length === 0 ? (
              <div className="py-20 text-center flex flex-col items-center justify-center text-[#78716C]">
                <Heart className="w-10 h-10 text-[#D8D3C8] mb-3" />
                <p className="text-sm font-medium text-[#1C1917] mb-1">لیست علاقه‌مندی‌های شما خالی است</p>
                <p className="text-xs text-[#78716C]">
                  با کلیک بر روی آیکون قلب روی هر اثر، آن را برای مقایسه ذخیره کنید.
                </p>
              </div>
            ) : (
              wishlistProducts.map((product) => {
                const priceInfo = calculateProductPrice(product, goldRates);
                return (
                  <div
                    key={product.id}
                    className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#E8E4DA] flex gap-3.5 items-center shadow-2xs"
                  >
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      onClick={() => {
                        onClose();
                        onQuickView(product);
                      }}
                      className="w-16 h-16 rounded-lg object-cover bg-white shrink-0 border border-[#E8E4DA] cursor-pointer"
                    />

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-1">
                        <h4
                          onClick={() => {
                            onClose();
                            onQuickView(product);
                          }}
                          className="text-xs font-bold text-[#1C1917] truncate cursor-pointer hover:text-[#A16207]"
                        >
                          {product.name}
                        </h4>
                        <button
                          onClick={() => onRemoveFromWishlist(product)}
                          className="text-[#78716C] hover:text-[#EF4444] p-1 cursor-pointer transition-colors"
                          title="حذف"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="mt-1 text-[11px] text-[#78716C]">
                        <span className="text-[#925B03] font-medium">{formatWeight(product.weightInGrams)}</span> • <span>{product.karat} عیار</span>
                      </div>

                      <div className="mt-2 flex items-center justify-between">
                        <div className="text-xs font-bold text-[#A16207]">
                          {formatPrice(priceInfo.total)}
                        </div>
                        <button
                          onClick={() => onAddToCart(product)}
                          className="px-2.5 py-1 rounded-lg bg-gradient-to-r from-[#B8860B] to-[#D4AF37] text-white font-bold text-[11px] flex items-center gap-1 hover:brightness-105 shadow-2xs cursor-pointer"
                        >
                          <ShoppingBag className="w-3 h-3" />
                          <span>خرید</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
