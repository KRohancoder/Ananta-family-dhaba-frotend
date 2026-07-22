/** Formats a rupee amount, e.g. 320 -> "₹320". */
export function formatPrice(amount: number): string {
  return `₹${amount.toLocaleString('en-IN')}`;
}

/** Formats a half/full price pair, e.g. (200, 350) -> "₹200 / ₹350". */
export function formatPriceRange(half?: number, full?: number): string {
  if (half != null && full != null) return `${formatPrice(half)} / ${formatPrice(full)}`;
  if (full != null) return formatPrice(full);
  if (half != null) return formatPrice(half);
  return '';
}
