/**
 * Format date string to Turkish locale string
 * @param dateString - Date string to format or "now" for current date
 * @param locale - Locale to format date string (default: "tr-TR")
 * @returns Formatted date string in Turkish locale
 */
const formatDate = (dateString: string, locale: string = "tr-TR"): string => {
  const date = dateString === "now" ? new Date() : new Date(dateString);
  return isNaN(date.getTime()) ? "Şimdi" : date.toLocaleString(locale);
};

/**
 * Format price to dot separated string
 * @param price - Price to format
 * @returns Formatted price string
 */
const formatPrice = (price: number): string => {
  return new Intl.NumberFormat("tr-TR", { minimumFractionDigits: 0 }).format(
    price
  );
};

export { formatDate, formatPrice };
