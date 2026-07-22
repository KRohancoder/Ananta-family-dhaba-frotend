import { cn } from '@/lib/cn';
import styles from './Badge.module.css';
import type { BadgeProps } from './Badge.types';

export function Badge({ tone = 'neutral', children }: BadgeProps) {
  return (
    <span className={cn(styles.badge, styles[tone])}>
      <span className={styles.dot} aria-hidden="true" />
      {children}
    </span>
  );
}
