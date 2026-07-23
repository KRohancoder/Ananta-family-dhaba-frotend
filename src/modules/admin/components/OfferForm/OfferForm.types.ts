import type { Offer } from '@/store/offersStore';

export interface OfferFormProps {
  offer?: Offer;
  onDone: () => void;
}
