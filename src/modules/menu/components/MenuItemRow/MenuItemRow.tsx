import { cn } from '@/lib/cn';
import { formatPrice } from '@/shared/utils/formatPrice';
import styles from './MenuItemRow.module.css';
import type { MenuItemRowProps } from './MenuItemRow.types';

export function MenuItemRow({ item }: MenuItemRowProps) {
  const { half, full } = item;

  return (
    <div className={styles.row}>
      <div className={styles.info}>
        <span
          className={cn(styles.dot, item.diet === 'veg' ? styles.dotVeg : styles.dotNonVeg)}
          aria-label={item.diet === 'veg' ? 'Vegetarian' : 'Non-vegetarian'}
          role="img"
        />
        <div>
          <p className={styles.name}>{item.name}</p>
          <p className={cn(styles.nameDevanagari, 'lang-mr')}>{item.nameDevanagari}</p>
        </div>
      </div>
      <div className={styles.price}>
        {half != null && full != null ? (
          <>
            {formatPrice(half)} / {formatPrice(full)}
            <span className={styles.priceUnit}>Half / Full</span>
          </>
        ) : (
          formatPrice(full ?? item.price ?? 0)
        )}
      </div>
    </div>
  );
}
