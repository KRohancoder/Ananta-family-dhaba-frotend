import { cn } from '@/lib/cn';
import styles from './Container.module.css';
import type { ContainerProps } from './Container.types';

export function Container({
  as: Component = 'div',
  narrow = false,
  className,
  children,
  ...rest
}: ContainerProps) {
  return (
    <Component className={cn(styles.container, narrow && styles.narrow, className)} {...rest}>
      {children}
    </Component>
  );
}
