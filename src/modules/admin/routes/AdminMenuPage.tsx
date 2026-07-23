import { useState } from 'react';
import { Button } from '@/components/Button';
import { PageMeta } from '@/components/PageMeta';
import { SectionHeading } from '@/components/SectionHeading';
import type { MenuItem } from '@/modules/menu/types/menu.types';
import { useMenuStore } from '@/store/menuStore';
import { CategoryForm } from '../components/CategoryForm';
import { MenuItemForm } from '../components/MenuItemForm';
import { MenuItemTable } from '../components/MenuItemTable';
import styles from './AdminMenuPage.module.css';

interface EditingItemState {
  categoryId: string;
  item?: MenuItem;
}

export function AdminMenuPage() {
  const categories = useMenuStore((state) => state.categories);
  const [showCategoryForm, setShowCategoryForm] = useState(false);
  const [editingItem, setEditingItem] = useState<EditingItemState | null>(null);

  return (
    <>
      <PageMeta title="Manage Menu" />
      <div className={styles.header}>
        <SectionHeading eyebrow="Menu Management" title="Menu Items" />
        <div className={styles.headerActions}>
          <Button
            variant="outline"
            onClick={() => {
              setShowCategoryForm((value) => !value);
              setEditingItem(null);
            }}
          >
            {showCategoryForm ? 'Cancel' : 'Add Category'}
          </Button>
          <Button
            onClick={() => {
              setEditingItem({ categoryId: categories[0]?.id ?? '', item: undefined });
              setShowCategoryForm(false);
            }}
            disabled={categories.length === 0}
          >
            Add Item
          </Button>
        </div>
      </div>

      {showCategoryForm ? (
        <div className={styles.formPanel}>
          <CategoryForm onDone={() => setShowCategoryForm(false)} />
        </div>
      ) : null}

      {editingItem ? (
        <div className={styles.formPanel}>
          <MenuItemForm
            categories={categories}
            initialCategoryId={editingItem.categoryId}
            item={editingItem.item}
            onDone={() => setEditingItem(null)}
          />
        </div>
      ) : null}

      <div className={styles.tables}>
        {categories.map((category) => (
          <MenuItemTable
            key={category.id}
            category={category}
            onEditItem={(item) => {
              setEditingItem({ categoryId: category.id, item });
              setShowCategoryForm(false);
            }}
          />
        ))}
      </div>
    </>
  );
}
