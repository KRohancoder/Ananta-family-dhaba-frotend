import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/Button';
import { cn } from '@/lib/cn';
import { siteInfo } from '@/shared/constants/site';
import {
  buildWhatsAppConfirmationLink,
  submitReservation,
} from '../../services/reservationService';
import styles from './ReservationForm.module.css';

const reservationSchema = z.object({
  name: z.string().min(2, 'Enter your name'),
  phone: z.string().min(8, 'Enter a valid phone number'),
  partySize: z.coerce.number().min(1, 'At least 1 guest').max(30, 'For 30+ guests, please call us'),
  date: z.string().min(1, 'Pick a date'),
  time: z.string().min(1, 'Pick a time'),
  notes: z.string().optional(),
});

type ReservationFormValues = z.infer<typeof reservationSchema>;

const todayIso = new Date().toISOString().split('T')[0];

export function ReservationForm() {
  const [confirmedLink, setConfirmedLink] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ReservationFormValues>({
    resolver: zodResolver(reservationSchema),
    defaultValues: { partySize: 2 },
  });

  const onSubmit = async (values: ReservationFormValues) => {
    await submitReservation(values);
    setConfirmedLink(buildWhatsAppConfirmationLink(values, siteInfo.whatsapp));
  };

  if (confirmedLink) {
    return (
      <div className={styles.confirmation}>
        <p className={styles.confirmationTitle}>Request received!</p>
        <p>
          We&apos;ve noted your request. For a faster confirmation, send us the details on WhatsApp
          and we&apos;ll lock in your table.
        </p>
        <Button as="a" href={confirmedLink} target="_blank" rel="noreferrer">
          Confirm on WhatsApp
        </Button>
      </div>
    );
  }

  return (
    <form
      className={styles.form}
      onSubmit={(event) => void handleSubmit(onSubmit)(event)}
      noValidate
    >
      <div className={styles.row}>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="reservation-name">
            Name
          </label>
          <input
            id="reservation-name"
            className={cn(styles.input, errors.name && styles.inputError)}
            aria-invalid={Boolean(errors.name)}
            {...register('name')}
          />
          {errors.name ? <span className={styles.errorText}>{errors.name.message}</span> : null}
        </div>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="reservation-phone">
            Phone
          </label>
          <input
            id="reservation-phone"
            type="tel"
            className={cn(styles.input, errors.phone && styles.inputError)}
            aria-invalid={Boolean(errors.phone)}
            {...register('phone')}
          />
          {errors.phone ? <span className={styles.errorText}>{errors.phone.message}</span> : null}
        </div>
      </div>

      <div className={cn(styles.row, styles.row3)}>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="reservation-date">
            Date
          </label>
          <input
            id="reservation-date"
            type="date"
            min={todayIso}
            className={cn(styles.input, errors.date && styles.inputError)}
            aria-invalid={Boolean(errors.date)}
            {...register('date')}
          />
          {errors.date ? <span className={styles.errorText}>{errors.date.message}</span> : null}
        </div>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="reservation-time">
            Time
          </label>
          <input
            id="reservation-time"
            type="time"
            className={cn(styles.input, errors.time && styles.inputError)}
            aria-invalid={Boolean(errors.time)}
            {...register('time')}
          />
          {errors.time ? <span className={styles.errorText}>{errors.time.message}</span> : null}
        </div>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="reservation-party-size">
            Guests
          </label>
          <input
            id="reservation-party-size"
            type="number"
            min={1}
            max={30}
            className={cn(styles.input, errors.partySize && styles.inputError)}
            aria-invalid={Boolean(errors.partySize)}
            {...register('partySize')}
          />
          {errors.partySize ? (
            <span className={styles.errorText}>{errors.partySize.message}</span>
          ) : null}
        </div>
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="reservation-notes">
          Notes (optional)
        </label>
        <textarea
          id="reservation-notes"
          className={styles.textarea}
          rows={3}
          placeholder="Birthday celebration, seating preference, dietary needs…"
          {...register('notes')}
        />
      </div>

      <Button type="submit" disabled={isSubmitting} size="lg">
        {isSubmitting ? 'Sending…' : 'Request Reservation'}
      </Button>
    </form>
  );
}
