import styles from './CategoryNav.module.css';
import type { CategoryNavProps } from './CategoryNav.types';

export function CategoryNav({ categories }: CategoryNavProps) {
  return (
    <nav className={styles.nav} aria-label="Menu categories">
      {categories.map((category) => (
        <a key={category.id} className={styles.pill} href={`#${category.id}`}>
          {category.name}
        </a>
      ))}
    </nav>
  );
}
