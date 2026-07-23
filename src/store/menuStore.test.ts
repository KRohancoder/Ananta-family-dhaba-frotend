import { beforeEach, describe, expect, it } from 'vitest';
import { useMenuStore } from './menuStore';

beforeEach(() => {
  useMenuStore.getState().resetToDefaults();
});

describe('menuStore', () => {
  it('toggleItemActive flips an item between visible and hidden', () => {
    const { toggleItemActive } = useMenuStore.getState();

    toggleItemActive('salad-green');
    let item = useMenuStore
      .getState()
      .categories.flatMap((category) => category.items)
      .find((candidate) => candidate.id === 'salad-green');
    expect(item?.isActive).toBe(false);

    toggleItemActive('salad-green');
    item = useMenuStore
      .getState()
      .categories.flatMap((category) => category.items)
      .find((candidate) => candidate.id === 'salad-green');
    expect(item?.isActive).toBe(true);
  });

  it('updateItem merges price changes onto the existing item', () => {
    useMenuStore.getState().updateItem('salad-green', { price: 75 });
    const item = useMenuStore
      .getState()
      .categories.flatMap((category) => category.items)
      .find((candidate) => candidate.id === 'salad-green');
    expect(item?.price).toBe(75);
  });

  it('addItem appends a new item to the given category', () => {
    useMenuStore.getState().addItem('salad', {
      id: 'salad-test',
      name: 'Test Salad',
      nameDevanagari: 'टेस्ट सॅलड',
      diet: 'veg',
      price: 40,
    });

    const category = useMenuStore.getState().categories.find((c) => c.id === 'salad');
    expect(category?.items.some((item) => item.id === 'salad-test')).toBe(true);
  });

  it('addCategory appends a new empty category', () => {
    useMenuStore.getState().addCategory({
      id: 'test-category',
      name: 'Test Category',
      nameDevanagari: 'टेस्ट कॅटेगरी',
      items: [],
    });

    expect(useMenuStore.getState().categories.some((c) => c.id === 'test-category')).toBe(true);
  });
});
