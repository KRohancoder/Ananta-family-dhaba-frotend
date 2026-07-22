export const env = {
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL || '',
  siteName: import.meta.env.VITE_SITE_NAME || 'Anant Family Dhaba',
  contactPhone: import.meta.env.VITE_CONTACT_PHONE || '+91 00000 00000',
  contactWhatsapp: import.meta.env.VITE_CONTACT_WHATSAPP || '910000000000',
  contactEmail: import.meta.env.VITE_CONTACT_EMAIL || 'info@anantfamilydhaba.com',
  isDev: import.meta.env.DEV,
  isProd: import.meta.env.PROD,
} as const;
