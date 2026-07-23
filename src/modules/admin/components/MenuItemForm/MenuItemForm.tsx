import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/Button';
import { cn } from '@/lib/cn';
import type { MenuItem } from '@/modules/menu/types/menu.types';
import { slugify, uniqueSlug } from '@/shared/utils/slugify';
import { useMenuStore } from '@/store/menuStore';
import styles from './MenuItemForm.module.css';
import type { MenuItemFormProps } from './MenuItemForm.types';

const menuItemSchema = z.object({
  categoryId: z.string().min(1, 'Choose a category'),
  name: z.string().min(2, 'Enter a name'),
  nameDevanagari: z.string().min(1, 'Enter the Marathi name'),
  diet: z.enum(['veg', 'non-veg']),
  priceMode: z.enum(['flat', 'half-full']),
  price: z.string().optional(),
  half: z.string().optional(),
  full: z.string().optional(),
});

type MenuItemFormValues = z.infer<typeof menuItemSchema>;

export function MenuItemForm({ categories, initialCategoryId, item, onDone }: MenuItemFormProps) {
  const addItem = useMenuStore((state) => state.addItem);
  const updateItem = useMenuStore((state) => state.updateItem);
  const [priceMode, setPriceMode] = useState<'flat' | 'half-full'>(
    item?.half != null || item?.full != null ? 'half-full' : 'flat',
  );

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<MenuItemFormValues>({
    resolver: zodResolver(menuItemSchema),
    defaultValues: {
      categoryId: initialCategoryId,
      name: item?.name ?? '',
      nameDevanagari: item?.nameDevanagari ?? '',
      diet: item?.diet ?? 'veg',
      priceMode: item?.half != null || item?.full != null ? 'half-full' : 'flat',
      price: item?.price != null ? String(item.price) : '',
      half: item?.half != null ? String(item.half) : '',
      full: item?.full != null ? String(item.full) : '',
    },
  });

  const onSubmit = (values: MenuItemFormValues) => {
    let priceFields: Pick<MenuItem, 'price' | 'half' | 'full'>;

    if (priceMode === 'flat') {
      const price = Number(values.price);
      if (!values.price || Number.isNaN(price) || price <= 0) {
        setError('price', { message: 'Enter a valid price' });
        return;
      }
      priceFields = { price, half: undefined, full: undefined };
    } else {
      const full = values.full ? Number(values.full) : NaN;
      if (!values.full || Number.isNaN(full) || full <= 0) {
        setError('full', { message: 'Enter a valid full-portion price' });
        return;
      }
      const half = values.half ? Number(values.half) : undefined;
      priceFields = { price: undefined, half, full };
    }

    const commonFields = {
      name: values.name,
      nameDevanagari: values.nameDevanagari,
      diet: values.diet,
    };

    if (item) {
      updateItem(item.id, { ...commonFields, ...priceFields });
    } else {
      const existingIds = categories.flatMap((category) => category.items.map((i) => i.id));
      addItem(values.categoryId, {
        id: uniqueSlug(slugify(values.name), existingIds),
        ...commonFields,
        ...priceFields,
      });
    }

    onDone();
  };

  return (
    <form
      className={styles.form}
      onSubmit={(event) => void handleSubmit(onSubmit)(event)}
      noValidate
    >
      <p className={styles.title}>{item ? 'Edit Item' : 'Add Item'}</p>

      <div className={styles.row}>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="item-name">
            Name
          </label>
          <input
            id="item-name"
            className={cn(styles.input, errors.name && styles.inputError)}
            {...register('name')}
          />
          {errors.name ? <span className={styles.errorText}>{errors.name.message}</span> : null}
        </div>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="item-name-mr">
            Name (Marathi)
          </label>
          <input
            id="item-name-mr"
            className={cn(styles.input, errors.nameDevanagari && styles.inputError)}
            {...register('nameDevanagari')}
          />
          {errors.nameDevanagari ? (
            <span className={styles.errorText}>{errors.nameDevanagari.message}</span>
          ) : null}
        </div>
      </div>

      <div className={styles.row}>
        {!item ? (
          <div className={styles.field}>
            <label className={styles.label} htmlFor="item-category">
              Category
            </label>
            <select id="item-category" className={styles.select} {...register('categoryId')}>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        ) : null}
        <div className={styles.field}>
          <label className={styles.label} htmlFor="item-diet">
            Diet
          </label>
          <select id="item-diet" className={styles.select} {...register('diet')}>
            <option value="veg">Veg</option>
            <option value="non-veg">Non-Veg</option>
          </select>
        </div>
      </div>

      <div className={styles.field}>
        <span className={styles.label}>Pricing</span>
        <div className={styles.priceModeRow}>
          <label className={styles.radioLabel}>
            <input
              type="radio"
              checked={priceMode === 'flat'}
              onChange={() => setPriceMode('flat')}
            />
            Single price
          </label>
          <label className={styles.radioLabel}>
            <input
              type="radio"
              checked={priceMode === 'half-full'}
              onChange={() => setPriceMode('half-full')}
            />
            Half / Full
          </label>
        </div>
      </div>

      {priceMode === 'flat' ? (
        <div className={styles.field}>
          <label className={styles.label} htmlFor="item-price">
            Price (₹)
          </label>
          <input
            id="item-price"
            type="number"
            min={0}
            className={cn(styles.input, errors.price && styles.inputError)}
            {...register('price')}
          />
          {errors.price ? <span className={styles.errorText}>{errors.price.message}</span> : null}
        </div>
      ) : (
        <div className={styles.row}>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="item-half">
              Half price (₹)
            </label>
            <input
              id="item-half"
              type="number"
              min={0}
              className={styles.input}
              {...register('half')}
            />
          </div>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="item-full">
              Full price (₹)
            </label>
            <input
              id="item-full"
              type="number"
              min={0}
              className={cn(styles.input, errors.full && styles.inputError)}
              {...register('full')}
            />
            {errors.full ? <span className={styles.errorText}>{errors.full.message}</span> : null}
          </div>
        </div>
      )}

      <div className={styles.actions}>
        <Button type="button" variant="outline" onClick={onDone}>
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {item ? 'Save Changes' : 'Add Item'}
        </Button>
      </div>
    </form>
  );
}
