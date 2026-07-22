import { cn } from '@/lib/cn';
import styles from './Card.module.css';
import type { CardProps } from './Card.types';

export function Card({
  padded = true,
  hoverable = false,
  className,
  children,
  ...rest
}: CardProps) {
  return (
    <div
      className={cn(styles.card, padded && styles.padded, hoverable && styles.hoverable, className)}
      {...rest}
    >
      {children}
    </div>
  );
}
