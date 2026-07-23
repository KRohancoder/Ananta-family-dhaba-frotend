import { useState } from 'react';
import { Button } from '@/components/Button';
import { PageMeta } from '@/components/PageMeta';
import { SectionHeading } from '@/components/SectionHeading';
import type { Offer } from '@/store/offersStore';
import { useOffersStore } from '@/store/offersStore';
import { OfferForm } from '../components/OfferForm';
import { OfferTable } from '../components/OfferTable';
import styles from './AdminOffersPage.module.css';

export function AdminOffersPage() {
  const offers = useOffersStore((state) => state.offers);
  const [editingOffer, setEditingOffer] = useState<Offer | 'new' | null>(null);

  return (
    <>
      <PageMeta title="Manage Offers" />
      <div className={styles.header}>
        <SectionHeading eyebrow="Promotions" title="Offers" />
        <Button onClick={() => setEditingOffer('new')}>Add Offer</Button>
      </div>

      {editingOffer ? (
        <div className={styles.formPanel}>
          <OfferForm
            offer={editingOffer === 'new' ? undefined : editingOffer}
            onDone={() => setEditingOffer(null)}
          />
        </div>
      ) : null}

      <div className={styles.tableWrap}>
        <OfferTable offers={offers} onEditOffer={setEditingOffer} />
      </div>
    </>
  );
}
