import type { DietFilterValue } from '../DietFilter';
import type { MenuCategory } from '../../types/menu.types';

export interface CategorySectionProps {
  category: MenuCategory;
  dietFilter: DietFilterValue;
}
