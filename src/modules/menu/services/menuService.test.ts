import { beforeEach, describe, expect, it } from 'vitest';
import { useMenuStore } from '@/store/menuStore';
import { getMenu } from './menuService';

beforeEach(() => {
  useMenuStore.getState().resetToDefaults();
});

describe('getMenu', () => {
  it('excludes items an owner has hidden', async () => {
    useMenuStore.getState().toggleItemActive('salad-green');

    const categories = await getMenu();
    const saladCategory = categories.find((category) => category.id === 'salad');
    expect(saladCategory?.items.some((item) => item.id === 'salad-green')).toBe(false);
  });

  it('drops a category entirely once all of its items are hidden', async () => {
    const saladCategory = useMenuStore.getState().categories.find((c) => c.id === 'salad');
    for (const item of saladCategory?.items ?? []) {
      useMenuStore.getState().toggleItemActive(item.id);
    }

    const categories = await getMenu();
    expect(categories.some((category) => category.id === 'salad')).toBe(false);
  });
});
