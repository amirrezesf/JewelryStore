import React, { useState } from 'react';
import { Star, CheckCircle, Quote, Plus } from 'lucide-react';
import { Review } from '../types';

interface CustomerReviewsProps {
  reviews?: Review[];
  onAddReview?: (review: Omit<Review, 'id' | 'date'>) => void;
}

export const CustomerReviews: React.FC<CustomerReviewsProps> = ({ reviews = [], onAddReview }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  const [productName, setProductName] = useState('');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !comment.trim()) return;
    if (onAddReview) {
      onAddReview({
        authorName: name.trim(),
        city: city.trim() || 'تهران',
        rating,
        comment: comment.trim(),
        productName: productName.trim() || 'خرید از ویترین زرین',
        verifiedPurchase: true,
      });
    }
    setName('');
    setCity('');
    setProductName('');
    setComment('');
    setModalOpen(false);
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#E8E4DA]">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <span className="text-xs font-semibold tracking-wider text-[#925B03] uppercase block mb-1">
            CLIENT TESTIMONIALS
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-serif-luxury text-[#1C1917]">
            تجربه و اعتماد خریداران گالری زرین
          </h2>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-[#D4AF37]/40 bg-white text-xs font-medium text-[#925B03] hover:bg-[#B8860B] hover:text-white transition-all self-start md:self-auto cursor-pointer shadow-xs"
        >
          <Plus className="w-3.5 h-3.5" />
          ثبت نظر و تجربه خرید
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {reviews.map((rev) => (
          <div
            key={rev.id}
            className="p-6 rounded-2xl bg-white border border-[#E8E4DA] relative flex flex-col justify-between shadow-xs"
          >
            <div>
              {/* Rating stars & verified badge */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-1 text-[#B8860B]">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                {rev.verifiedPurchase && (
                  <span className="inline-flex items-center gap-1 text-[11px] text-[#059669] bg-[#059669]/10 px-2 py-0.5 rounded-full font-medium">
                    <CheckCircle className="w-3 h-3" />
                    خریدار تایید شده
                  </span>
                )}
              </div>

              {/* Comment text */}
              <p className="text-sm text-[#44403C] font-light leading-relaxed mb-6">
                «{rev.comment}»
              </p>
            </div>

            {/* Author info */}
            <div className="pt-4 border-t border-[#E8E4DA] flex items-center justify-between text-xs">
              <div>
                <span className="font-semibold text-[#1C1917] block">{rev.authorName}</span>
                <span className="text-[11px] text-[#78716C]">{rev.city} • {rev.productName}</span>
              </div>
              <span className="text-[11px] text-[#A8A29E]">{rev.date}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Add Review Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white border border-[#E8E4DA] rounded-2xl max-w-md w-full p-6 text-right shadow-2xl">
            <h3 className="text-lg font-bold text-[#1C1917] mb-4">ثبت تجربه خرید از گالری زرین</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs text-[#57534E] mb-1">نام و نام خانوادگی:</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="مثال: مریم راد"
                  className="w-full px-3 py-2 rounded-lg bg-[#FAF8F5] border border-[#E8E4DA] text-sm text-[#1C1917] focus:border-[#B8860B] outline-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-[#57534E] mb-1">شهر محل سکونت:</label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="مثال: تهران"
                    className="w-full px-3 py-2 rounded-lg bg-[#FAF8F5] border border-[#E8E4DA] text-sm text-[#1C1917] focus:border-[#B8860B] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs text-[#57534E] mb-1">نام قطعه طلا:</label>
                  <input
                    type="text"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    placeholder="مثال: انگشتر نوا"
                    className="w-full px-3 py-2 rounded-lg bg-[#FAF8F5] border border-[#E8E4DA] text-sm text-[#1C1917] focus:border-[#B8860B] outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs text-[#57534E] mb-1">امتیاز شما:</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setRating(s)}
                      className={`p-2 rounded-lg border text-xs flex items-center gap-1 cursor-pointer transition-colors ${
                        rating >= s ? 'bg-[#D4AF37]/15 border-[#B8860B] text-[#925B03]' : 'border-[#E8E4DA] text-[#78716C] bg-[#FAF8F5]'
                      }`}
                    >
                      <Star className={`w-3.5 h-3.5 ${rating >= s ? 'fill-current' : ''}`} />
                      <span>{s}</span>
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-xs text-[#57534E] mb-1">دیدگاه شما:</label>
                <textarea
                  required
                  rows={4}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="لطفاً نظر خود را درباره کیفیت ساخت، عیار، بسته‌بندی و تحویل بنویسید..."
                  className="w-full px-3 py-2 rounded-lg bg-[#FAF8F5] border border-[#E8E4DA] text-sm text-[#1C1917] focus:border-[#B8860B] outline-none"
                ></textarea>
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-lg bg-gradient-to-r from-[#B8860B] to-[#D4AF37] text-white font-bold text-sm hover:brightness-105 shadow-sm cursor-pointer"
                >
                  ثبت نظر
                </button>
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2.5 rounded-lg bg-[#F5F3EF] text-[#57534E] text-sm hover:bg-[#EAE6DF] cursor-pointer"
                >
                  انصراف
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
