import { env } from '@/config/env';

/**
 * TODO: replace placeholder address/hours with the real business details.
 * Phone/WhatsApp/email come from env vars (see .env.example).
 */
export const siteInfo = {
  name: env.siteName,
  nameDevanagari: 'अनंत फॅमिली ढाबा',
  tagline: 'Authentic dhaba-style food, fresh off the tawa',
  phone: env.contactPhone,
  whatsapp: env.contactWhatsapp,
  email: env.contactEmail,
  // TODO: replace with the real shop address.
  address: 'Address coming soon — call us for directions',
  mapEmbedUrl: '',
  hours: [
    { day: 'Monday – Friday', time: '12:00 PM – 11:30 PM' },
    { day: 'Saturday – Sunday', time: '12:00 PM – 12:00 AM' },
  ],
  socials: {
    instagram: 'https://instagram.com/',
    facebook: 'https://facebook.com/',
    whatsapp: `https://wa.me/${env.contactWhatsapp}`,
  },
  notices: [
    'मद्यपान करण्याची परवानगी नाही. (Alcohol is not permitted.)',
    'धूम्रपान नाही. (No smoking.)',
    'ऑर्डरला किमान २० मिनिटे लागतील. (Orders take at least 20 minutes.)',
  ],
} as const;

export const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Menu', to: '/menu' },
  { label: 'Gallery', to: '/gallery' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
] as const;
