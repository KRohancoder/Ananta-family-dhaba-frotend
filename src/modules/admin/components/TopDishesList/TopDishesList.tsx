import { Card } from '@/components/Card';
import { formatPrice } from '@/shared/utils/formatPrice';
import styles from './TopDishesList.module.css';
import type { TopDishesListProps } from './TopDishesList.types';

export function TopDishesList({ dishes }: TopDishesListProps) {
  if (dishes.length === 0) {
    return (
      <Card className={styles.card}>
        <p className={styles.empty}>No orders yet.</p>
      </Card>
    );
  }

  const maxQuantity = Math.max(...dishes.map((dish) => dish.quantity));

  return (
    <Card className={styles.card}>
      <ul className={styles.list}>
        {dishes.map((dish) => (
          <li key={dish.menuItemId} className={styles.row}>
            <div className={styles.rowHead}>
              <span className={styles.name}>{dish.itemName}</span>
              <span className={styles.meta}>
                {dish.quantity} sold · {formatPrice(dish.revenue)}
              </span>
            </div>
            <div className={styles.barTrack}>
              <div
                className={styles.barFill}
                style={{ width: `${(dish.quantity / maxQuantity) * 100}%` }}
              />
            </div>
          </li>
        ))}
      </ul>
    </Card>
  );
}
