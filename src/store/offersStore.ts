import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type OfferDiscountType = 'percent' | 'flat';
export type OfferScope = 'storewide' | 'category' | 'item';

export interface Offer {
  id: string;
  title: string;
  description?: string;
  discountType: OfferDiscountType;
  discountValue: number;
  scope: OfferScope;
  /** Category or menu item id — required when scope is 'category' or 'item'. */
  targetId?: string;
  isActive: boolean;
  createdAt: string;
}

interface OffersState {
  offers: Offer[];
  addOffer: (offer: Omit<Offer, 'id' | 'createdAt'>) => void;
  updateOffer: (id: string, updates: Partial<Omit<Offer, 'id' | 'createdAt'>>) => void;
  toggleOfferActive: (id: string) => void;
  removeOffer: (id: string) => void;
}

/**
 * Owner-managed offers/discounts. Local-only for now.
 * TODO: sync to a real backend (e.g. Supabase) once one is configured.
 */
export const useOffersStore = create<OffersState>()(
  persist(
    (set) => ({
      offers: [],

      addOffer: (offer) =>
        set((state) => ({
          offers: [
            ...state.offers,
            { ...offer, id: crypto.randomUUID(), createdAt: new Date().toISOString() },
          ],
        })),

      updateOffer: (id, updates) =>
        set((state) => ({
          offers: state.offers.map((offer) => (offer.id === id ? { ...offer, ...updates } : offer)),
        })),

      toggleOfferActive: (id) =>
        set((state) => ({
          offers: state.offers.map((offer) =>
            offer.id === id ? { ...offer, isActive: !offer.isActive } : offer,
          ),
        })),

      removeOffer: (id) =>
        set((state) => ({ offers: state.offers.filter((offer) => offer.id !== id) })),
    }),
    { name: 'afd-offers' },
  ),
);
