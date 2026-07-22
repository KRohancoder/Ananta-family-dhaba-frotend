import { apiClient, isApiConfigured } from '@/shared/api/apiClient';
import { menuCategories } from '../data/menuData';
import type { MenuCategory } from '../types/menu.types';

/**
 * Returns the full menu. Uses the local transcribed data by default;
 * once VITE_API_BASE_URL is set, swap this to call a real endpoint.
 */
export async function getMenu(): Promise<MenuCategory[]> {
  if (!isApiConfigured) return menuCategories;

  const { data } = await apiClient.get<MenuCategory[]>('/menu');
  return data;
}
