import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/Button';
import { cn } from '@/lib/cn';
import { slugify, uniqueSlug } from '@/shared/utils/slugify';
import { useMenuStore } from '@/store/menuStore';
import styles from './CategoryForm.module.css';
import type { CategoryFormProps } from './CategoryForm.types';

const categorySchema = z.object({
  name: z.string().min(2, 'Enter a category name'),
  nameDevanagari: z.string().min(1, 'Enter the Marathi name'),
});

type CategoryFormValues = z.infer<typeof categorySchema>;

export function CategoryForm({ onDone }: CategoryFormProps) {
  const categories = useMenuStore((state) => state.categories);
  const addCategory = useMenuStore((state) => state.addCategory);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CategoryFormValues>({ resolver: zodResolver(categorySchema) });

  const onSubmit = (values: CategoryFormValues) => {
    const existingIds = categories.map((category) => category.id);
    addCategory({
      id: uniqueSlug(slugify(values.name), existingIds),
      name: values.name,
      nameDevanagari: values.nameDevanagari,
      items: [],
    });
    onDone();
  };

  return (
    <form
      className={styles.form}
      onSubmit={(event) => void handleSubmit(onSubmit)(event)}
      noValidate
    >
      <p className={styles.title}>Add Category</p>
      <div className={styles.row}>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="category-name">
            Name
          </label>
          <input
            id="category-name"
            className={cn(styles.input, errors.name && styles.inputError)}
            {...register('name')}
          />
          {errors.name ? <span className={styles.errorText}>{errors.name.message}</span> : null}
        </div>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="category-name-mr">
            Name (Marathi)
          </label>
          <input
            id="category-name-mr"
            className={cn(styles.input, errors.nameDevanagari && styles.inputError)}
            {...register('nameDevanagari')}
          />
          {errors.nameDevanagari ? (
            <span className={styles.errorText}>{errors.nameDevanagari.message}</span>
          ) : null}
        </div>
      </div>
      <div className={styles.actions}>
        <Button type="button" variant="outline" onClick={onDone}>
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          Add Category
        </Button>
      </div>
    </form>
  );
}
