import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/Button';
import { cn } from '@/lib/cn';
import { sendContactMessage } from '../../services/contactService';
import styles from './ContactForm.module.css';

const contactSchema = z.object({
  name: z.string().min(2, 'Enter your name'),
  phone: z.string().min(8, 'Enter a valid phone number'),
  email: z.string().email('Enter a valid email').optional().or(z.literal('')),
  message: z.string().min(10, 'Tell us a little more (at least 10 characters)'),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({ resolver: zodResolver(contactSchema) });

  const onSubmit = async (values: ContactFormValues) => {
    await sendContactMessage({ ...values, email: values.email || undefined });
    setSubmitted(true);
    reset();
  };

  return (
    <form
      className={styles.form}
      onSubmit={(event) => void handleSubmit(onSubmit)(event)}
      noValidate
    >
      <div className={styles.row}>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="contact-name">
            Name
          </label>
          <input
            id="contact-name"
            className={cn(styles.input, errors.name && styles.inputError)}
            aria-invalid={Boolean(errors.name)}
            {...register('name')}
          />
          {errors.name ? <span className={styles.errorText}>{errors.name.message}</span> : null}
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="contact-phone">
            Phone
          </label>
          <input
            id="contact-phone"
            type="tel"
            className={cn(styles.input, errors.phone && styles.inputError)}
            aria-invalid={Boolean(errors.phone)}
            {...register('phone')}
          />
          {errors.phone ? <span className={styles.errorText}>{errors.phone.message}</span> : null}
        </div>
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="contact-email">
          Email (optional)
        </label>
        <input
          id="contact-email"
          type="email"
          className={cn(styles.input, errors.email && styles.inputError)}
          aria-invalid={Boolean(errors.email)}
          {...register('email')}
        />
        {errors.email ? <span className={styles.errorText}>{errors.email.message}</span> : null}
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="contact-message">
          Message
        </label>
        <textarea
          id="contact-message"
          className={cn(styles.textarea, errors.message && styles.inputError)}
          rows={5}
          aria-invalid={Boolean(errors.message)}
          {...register('message')}
        />
        {errors.message ? <span className={styles.errorText}>{errors.message.message}</span> : null}
      </div>

      <Button type="submit" disabled={isSubmitting} size="lg">
        {isSubmitting ? 'Sending…' : 'Send Message'}
      </Button>

      {submitted ? (
        <span className={styles.successText}>Thanks! We&apos;ll get back to you soon.</span>
      ) : null}
    </form>
  );
}
