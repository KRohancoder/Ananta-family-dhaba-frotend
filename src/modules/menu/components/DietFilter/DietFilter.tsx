import { cn } from '@/lib/cn';
import styles from './DietFilter.module.css';
import type { DietFilterProps, DietFilterValue } from './DietFilter.types';

const options: Array<{ value: DietFilterValue; label: string }> = [
  { value: 'all', label: 'All' },
  { value: 'veg', label: 'Veg' },
  { value: 'non-veg', label: 'Non-Veg' },
];

export function DietFilter({ value, onChange }: DietFilterProps) {
  return (
    <div className={styles.group} role="radiogroup" aria-label="Filter by diet">
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          role="radio"
          aria-checked={value === option.value}
          className={cn(styles.option, value === option.value && styles.active)}
          onClick={() => onChange(option.value)}
        >
          {option.value !== 'all' ? (
            <span
              className={cn(styles.dot, option.value === 'veg' ? styles.dotVeg : styles.dotNonVeg)}
            />
          ) : null}
          {option.label}
        </button>
      ))}
    </div>
  );
}
