import { Badge } from '@/components/Badge';
import { Card } from '@/components/Card';
import { EyeIcon, EyeOffIcon } from '@/shared/assets/icons';
import { formatPriceRange } from '@/shared/utils/formatPrice';
import { useMenuStore } from '@/store/menuStore';
import { cn } from '@/lib/cn';
import styles from './MenuItemTable.module.css';
import type { MenuItemTableProps } from './MenuItemTable.types';

export function MenuItemTable({ category, onEditItem }: MenuItemTableProps) {
  const toggleItemActive = useMenuStore((state) => state.toggleItemActive);

  return (
    <Card className={styles.card}>
      <div className={styles.categoryHead}>
        <h3 className={styles.categoryName}>{category.name}</h3>
        <span className={cn(styles.categoryNameMr, 'lang-mr')}>{category.nameDevanagari}</span>
      </div>

      <ul className={styles.list}>
        {category.items.map((item) => {
          const isActive = item.isActive !== false;
          return (
            <li key={item.id} className={cn(styles.row, !isActive && styles.rowInactive)}>
              <div className={styles.info}>
                <Badge tone={item.diet}>{item.diet === 'veg' ? 'Veg' : 'Non-Veg'}</Badge>
                <div>
                  <p className={styles.name}>{item.name}</p>
                  <p className={cn(styles.nameMr, 'lang-mr')}>{item.nameDevanagari}</p>
                </div>
              </div>

              <div className={styles.rowActions}>
                <span className={styles.price}>
                  {formatPriceRange(item.half, item.full ?? item.price)}
                </span>
                <button
                  type="button"
                  className={styles.iconButton}
                  onClick={() => onEditItem(item)}
                >
                  Edit
                </button>
                <button
                  type="button"
                  className={styles.iconButton}
                  aria-label={isActive ? 'Hide from menu' : 'Show on menu'}
                  onClick={() => toggleItemActive(item.id)}
                >
                  {isActive ? (
                    <EyeIcon width={18} height={18} />
                  ) : (
                    <EyeOffIcon width={18} height={18} />
                  )}
                  {isActive ? 'Visible' : 'Hidden'}
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </Card>
  );
}
