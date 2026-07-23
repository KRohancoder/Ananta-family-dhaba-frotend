import type { Offer } from '@/store/offersStore';

export interface OfferTableProps {
  offers: Offer[];
  onEditOffer: (offer: Offer) => void;
}
