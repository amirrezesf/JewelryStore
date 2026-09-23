import { INITIAL_GOLD_RATES } from '../data/mockData';
import { GoldRates, PriceBreakdown, Product } from '../types';

/**
 * Calculates the exact transparent price of a gold jewelry piece.
 * Formula as regulated by Iran Gold & Jewelry Union:
 * 1. Raw Gold Value = Weight (grams) * Price Per Gram (18K or 24K)
 * 2. Craftsmanship Fee = Raw Gold Value * (CraftFeePercent / 100) + FixedFee
 * 3. Lawful Retail Profit = (Raw Gold Value + Craftsmanship Fee) * (ProfitPercent / 100)
 * 4. Value Added Tax (VAT) = (Craftsmanship Fee + Lawful Retail Profit) * (TaxPercent / 100)
 *    [Note: Raw gold itself is tax-exempt by Iranian national tax law since 1400]
 * 5. Final Price = Raw Gold Value + Craftsmanship Fee + Lawful Retail Profit + VAT
 */
export function calculateProductPrice(product: Product, rates?: GoldRates): PriceBreakdown {
  const safeRates: GoldRates = rates && typeof rates.rate18K === 'number' ? rates : INITIAL_GOLD_RATES;
  const pricePerGramToday = product.karat === 24 ? safeRates.rate24K : safeRates.rate18K;
  const weight = typeof product.weightInGrams === 'number' ? product.weightInGrams : 1;
  const rawGoldPrice = Math.round(weight * (pricePerGramToday || 4850000));

  const craftFeePercent = product.craftFeePercent || 0;
  const fixedCraftFee = product.fixedCraftFee || 0;
  const craftFee = Math.round((rawGoldPrice * (craftFeePercent / 100)) + fixedCraftFee);

  const profitPercent = safeRates.profitPercent || 7; // standard 7%
  const profit = Math.round((rawGoldPrice + craftFee) * (profitPercent / 100));

  const taxPercent = safeRates.taxPercent || 9; // standard 9% on fee + profit
  const tax = Math.round((craftFee + profit) * (taxPercent / 100));

  const total = rawGoldPrice + craftFee + profit + tax;

  return {
    rawGoldPrice,
    craftFee,
    profit,
    tax,
    total,
    pricePerGramToday,
  };
}

/**
 * Converts English digits to Persian digits
 */
export function toPersianDigits(num: number | string | undefined | null): string {
  if (num === undefined || num === null) return '';
  const str = typeof num === 'number' ? num.toString() : num.toString();
  const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  return str.replace(/[0-9]/g, (w) => persianDigits[parseInt(w, 10)]);
}

/**
 * Formats a number with comma separators and Persian digits
 */
export function formatNumber(num: number | undefined | null): string {
  if (num === undefined || num === null || isNaN(Number(num))) return '۰';
  return toPersianDigits(new Intl.NumberFormat('en-US').format(Math.round(Number(num))));
}

/**
 * Formats price in Tomans with Persian notation
 */
export function formatPrice(amount: number | undefined | null, showCurrency = true): string {
  if (amount === undefined || amount === null || isNaN(Number(amount))) {
    return showCurrency ? '۰ تومان' : '۰';
  }
  const formatted = formatNumber(amount);
  return showCurrency ? `${formatted} تومان` : formatted;
}

/**
 * Formats weight with 2 decimals
 */
export function formatWeight(grams: number): string {
  return `${toPersianDigits(grams.toFixed(2))} گرم`;
}

/**
 * Generates an official tracking code for orders
 */
export function generateTrackingCode(): string {
  const prefix = 'ZR';
  const timestamp = Date.now().toString().slice(-6);
  const random = Math.floor(1000 + Math.random() * 9000);
  return `${prefix}-${timestamp}-${random}`;
}

/**
 * Generates an official jewelry pre-invoice number
 */
export function generateInvoiceNumber(): string {
  const year = '1405';
  const num = Math.floor(10000 + Math.random() * 90000);
  return `INV-${year}-${num}`;
}
