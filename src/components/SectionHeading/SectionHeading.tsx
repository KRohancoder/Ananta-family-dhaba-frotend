import { cn } from '@/lib/cn';
import styles from './SectionHeading.module.css';
import type { SectionHeadingProps } from './SectionHeading.types';

export function SectionHeading({
  eyebrow,
  title,
  titleDevanagari,
  description,
  align = 'left',
}: SectionHeadingProps) {
  return (
    <div className={cn(styles.wrapper, align === 'center' && styles.center)}>
      {eyebrow ? <span className={styles.eyebrow}>{eyebrow}</span> : null}
      <h2 className={styles.title}>{title}</h2>
      {titleDevanagari ? (
        <p className={cn(styles.devanagari, 'lang-mr')}>{titleDevanagari}</p>
      ) : null}
      {description ? <p className={styles.description}>{description}</p> : null}
    </div>
  );
}
