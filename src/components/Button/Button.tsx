import type { ElementType } from 'react';
import { cn } from '@/lib/cn';
import styles from './Button.module.css';
import type { ButtonProps } from './Button.types';

export function Button<E extends ElementType = 'button'>({
  as,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className,
  children,
  ...rest
}: ButtonProps<E>) {
  const Component = as ?? 'button';

  return (
    <Component
      className={cn(
        styles.button,
        styles[variant],
        styles[size],
        fullWidth && styles.fullWidth,
        className,
      )}
      {...rest}
    >
      {children}
    </Component>
  );
}
