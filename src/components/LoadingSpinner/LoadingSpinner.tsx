import { cn } from '@/lib/cn';
import styles from './LoadingSpinner.module.css';
import type { LoadingSpinnerProps } from './LoadingSpinner.types';

export function LoadingSpinner({ label = 'Loading…', fullScreen = false }: LoadingSpinnerProps) {
  return (
    <div className={cn(styles.wrapper, fullScreen && styles.fullScreen)} role="status">
      <span className={styles.spinner} aria-hidden="true" />
      <span className={styles.label}>{label}</span>
    </div>
  );
}
