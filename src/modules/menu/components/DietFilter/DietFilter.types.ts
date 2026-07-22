export type DietFilterValue = 'all' | 'veg' | 'non-veg';

export interface DietFilterProps {
  value: DietFilterValue;
  onChange: (value: DietFilterValue) => void;
}
