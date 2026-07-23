import { Badge } from '@/components/Badge';
import { Card } from '@/components/Card';
import { TrashIcon } from '@/shared/assets/icons';
import { formatPrice } from '@/shared/utils/formatPrice';
import { useMenuStore } from '@/store/menuStore';
import { useOffersStore } from '@/store/offersStore';
import { cn } from '@/lib/cn';
import styles from './OfferTable.module.css';
import type { OfferTableProps } from './OfferTable.types';

export function OfferTable({ offers, onEditOffer }: OfferTableProps) {
  const categories = useMenuStore((state) => state.categories);
  const toggleOfferActive = useOffersStore((state) => state.toggleOfferActive);
  const removeOffer = useOffersStore((state) => state.removeOffer);

  const items = categories.flatMap((category) => category.items);

  const targetLabel = (offer: (typeof offers)[number]) => {
    if (offer.scope === 'storewide') return 'Whole menu';
    if (offer.scope === 'category') {
      return categories.find((category) => category.id === offer.targetId)?.name ?? 'Category';
    }
    return items.find((item) => item.id === offer.targetId)?.name ?? 'Item';
  };

  if (offers.length === 0) {
    return (
      <Card>
        <p className={styles.empty}>No offers yet — add one to run a discount or promotion.</p>
      </Card>
    );
  }

  return (
    <Card className={styles.card}>
      <ul className={styles.list}>
        {offers.map((offer) => (
          <li key={offer.id} className={cn(styles.row, !offer.isActive && styles.rowInactive)}>
            <div>
              <p className={styles.title}>{offer.title}</p>
              <p className={styles.meta}>
                {offer.discountType === 'percent'
                  ? `${offer.discountValue}% off`
                  : `${formatPrice(offer.discountValue)} off`}{' '}
                · {targetLabel(offer)}
              </p>
            </div>
            <div className={styles.actions}>
              <Badge tone={offer.isActive ? 'accent' : 'neutral'}>
                {offer.isActive ? 'Active' : 'Paused'}
              </Badge>
              <button type="button" className={styles.button} onClick={() => onEditOffer(offer)}>
                Edit
              </button>
              <button
                type="button"
                className={styles.button}
                onClick={() => toggleOfferActive(offer.id)}
              >
                {offer.isActive ? 'Pause' : 'Resume'}
              </button>
              <button
                type="button"
                className={styles.iconButton}
                aria-label="Delete offer"
                onClick={() => removeOffer(offer.id)}
              >
                <TrashIcon width={16} height={16} />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </Card>
  );
}
