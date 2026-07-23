import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/Button';
import { cn } from '@/lib/cn';
import { useMenuStore } from '@/store/menuStore';
import { useOffersStore } from '@/store/offersStore';
import styles from './OfferForm.module.css';
import type { OfferFormProps } from './OfferForm.types';

const offerSchema = z.object({
  title: z.string().min(2, 'Enter a title'),
  description: z.string().optional(),
  discountType: z.enum(['percent', 'flat']),
  discountValue: z.string().min(1, 'Enter a discount value'),
  scope: z.enum(['storewide', 'category', 'item']),
  targetId: z.string().optional(),
});

type OfferFormValues = z.infer<typeof offerSchema>;

export function OfferForm({ offer, onDone }: OfferFormProps) {
  const categories = useMenuStore((state) => state.categories);
  const addOffer = useOffersStore((state) => state.addOffer);
  const updateOffer = useOffersStore((state) => state.updateOffer);

  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<OfferFormValues>({
    resolver: zodResolver(offerSchema),
    defaultValues: {
      title: offer?.title ?? '',
      description: offer?.description ?? '',
      discountType: offer?.discountType ?? 'percent',
      discountValue: offer ? String(offer.discountValue) : '',
      scope: offer?.scope ?? 'storewide',
      targetId: offer?.targetId ?? '',
    },
  });

  const scope = watch('scope');
  const discountType = watch('discountType');
  const items = categories.flatMap((category) => category.items);

  const onSubmit = (values: OfferFormValues) => {
    const discountValue = Number(values.discountValue);
    if (Number.isNaN(discountValue) || discountValue <= 0) {
      setError('discountValue', { message: 'Enter a valid discount value' });
      return;
    }
    if (values.discountType === 'percent' && discountValue > 100) {
      setError('discountValue', { message: 'Percent discount can’t exceed 100' });
      return;
    }
    if (values.scope !== 'storewide' && !values.targetId) {
      setError('targetId', { message: 'Choose a target' });
      return;
    }

    const fields = {
      title: values.title,
      description: values.description || undefined,
      discountType: values.discountType,
      discountValue,
      scope: values.scope,
      targetId: values.scope === 'storewide' ? undefined : values.targetId,
    };

    if (offer) {
      updateOffer(offer.id, fields);
    } else {
      addOffer({ ...fields, isActive: true });
    }

    onDone();
  };

  return (
    <form
      className={styles.form}
      onSubmit={(event) => void handleSubmit(onSubmit)(event)}
      noValidate
    >
      <p className={styles.title}>{offer ? 'Edit Offer' : 'Add Offer'}</p>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="offer-title">
          Title
        </label>
        <input
          id="offer-title"
          className={cn(styles.input, errors.title && styles.inputError)}
          {...register('title')}
        />
        {errors.title ? <span className={styles.errorText}>{errors.title.message}</span> : null}
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="offer-description">
          Description (optional)
        </label>
        <input id="offer-description" className={styles.input} {...register('description')} />
      </div>

      <div className={styles.row}>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="offer-discount-type">
            Discount type
          </label>
          <select id="offer-discount-type" className={styles.select} {...register('discountType')}>
            <option value="percent">Percent off</option>
            <option value="flat">Flat amount off (₹)</option>
          </select>
        </div>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="offer-discount-value">
            {discountType === 'percent' ? 'Percent off' : 'Amount off (₹)'}
          </label>
          <input
            id="offer-discount-value"
            type="number"
            min={0}
            className={cn(styles.input, errors.discountValue && styles.inputError)}
            {...register('discountValue')}
          />
          {errors.discountValue ? (
            <span className={styles.errorText}>{errors.discountValue.message}</span>
          ) : null}
        </div>
      </div>

      <div className={styles.row}>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="offer-scope">
            Applies to
          </label>
          <select id="offer-scope" className={styles.select} {...register('scope')}>
            <option value="storewide">Whole menu</option>
            <option value="category">One category</option>
            <option value="item">One item</option>
          </select>
        </div>

        {scope === 'category' ? (
          <div className={styles.field}>
            <label className={styles.label} htmlFor="offer-target">
              Category
            </label>
            <select id="offer-target" className={styles.select} {...register('targetId')}>
              <option value="">Choose a category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            {errors.targetId ? (
              <span className={styles.errorText}>{errors.targetId.message}</span>
            ) : null}
          </div>
        ) : null}

        {scope === 'item' ? (
          <div className={styles.field}>
            <label className={styles.label} htmlFor="offer-target">
              Item
            </label>
            <select id="offer-target" className={styles.select} {...register('targetId')}>
              <option value="">Choose an item</option>
              {items.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
            {errors.targetId ? (
              <span className={styles.errorText}>{errors.targetId.message}</span>
            ) : null}
          </div>
        ) : null}
      </div>

      <div className={styles.actions}>
        <Button type="button" variant="outline" onClick={onDone}>
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {offer ? 'Save Changes' : 'Add Offer'}
        </Button>
      </div>
    </form>
  );
}
