import { MenuItemRow } from '../MenuItemRow';
import styles from './CategorySection.module.css';
import type { CategorySectionProps } from './CategorySection.types';

export function CategorySection({ category, dietFilter }: CategorySectionProps) {
  const items =
    dietFilter === 'all'
      ? category.items
      : category.items.filter((item) => item.diet === dietFilter);

  if (items.length === 0) return null;

  return (
    <section id={category.id} className={styles.section}>
      <h2 className={styles.heading}>{category.name}</h2>
      <p className={styles.headingDevanagari}>{category.nameDevanagari}</p>
      <div>
        {items.map((item) => (
          <MenuItemRow key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}
