import type { DietType } from '@/shared/types/common';

export interface MenuItem {
  id: string;
  name: string;
  nameDevanagari: string;
  diet: DietType;
  /** Price for a half portion, in INR. Omitted when the item has one size only. */
  half?: number;
  /** Price for a full portion, in INR. */
  full?: number;
  /** Set instead of half/full when the dish has a single flat price. */
  price?: number;
  note?: string;
}

export interface MenuCategory {
  id: string;
  name: string;
  nameDevanagari: string;
  items: MenuItem[];
}
