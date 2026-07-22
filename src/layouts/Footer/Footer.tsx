import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { z } from 'zod';
import { Container } from '@/components/Container';
import {
  ClockIcon,
  FacebookIcon,
  InstagramIcon,
  MailIcon,
  MapPinIcon,
  PhoneIcon,
  WhatsAppIcon,
} from '@/shared/assets/icons';
import logo from '@/shared/assets/images/logo.jpg';
import { navLinks, siteInfo } from '@/shared/constants/site';
import { subscribeToNewsletter } from '@/shared/services/newsletterService';
import { cn } from '@/lib/cn';
import styles from './Footer.module.css';

const newsletterSchema = z.object({
  email: z.string().min(1, 'Enter your email').email('Enter a valid email'),
});

type NewsletterForm = z.infer<typeof newsletterSchema>;

export function Footer() {
  const [status, setStatus] = useState<'idle' | 'success'>('idle');
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<NewsletterForm>({ resolver: zodResolver(newsletterSchema) });

  const onSubmit = async (values: NewsletterForm) => {
    await subscribeToNewsletter(values.email);
    setStatus('success');
    reset();
  };

  return (
    <footer className={styles.footer}>
      <Container>
        <div className={styles.grid}>
          <div className={styles.brand}>
            <div className={styles.brandLogoRow}>
              <img className={styles.brandLogoImg} src={logo} alt="" />
              <span className={styles.brandTitle}>{siteInfo.name}</span>
            </div>
            <p className={styles.brandTagline}>{siteInfo.tagline}</p>
            <div className={styles.socials}>
              <a
                className={styles.socialLink}
                href={siteInfo.socials.instagram}
                aria-label="Instagram"
              >
                <InstagramIcon width={18} height={18} />
              </a>
              <a
                className={styles.socialLink}
                href={siteInfo.socials.facebook}
                aria-label="Facebook"
              >
                <FacebookIcon width={18} height={18} />
              </a>
              <a
                className={styles.socialLink}
                href={siteInfo.socials.whatsapp}
                aria-label="WhatsApp"
              >
                <WhatsAppIcon width={18} height={18} />
              </a>
            </div>
          </div>

          <div>
            <h3 className={styles.heading}>Company</h3>
            <nav className={styles.linkList} aria-label="Footer">
              {navLinks.map((link) => (
                <Link key={link.to} to={link.to}>
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <h3 className={styles.heading}>Contact & Hours</h3>
            <div className={styles.linkList}>
              <div className={styles.contactRow}>
                <MapPinIcon width={16} height={16} />
                <span>{siteInfo.address}</span>
              </div>
              <a className={styles.contactRow} href={`tel:${siteInfo.phone.replace(/\s+/g, '')}`}>
                <PhoneIcon width={16} height={16} />
                <span>{siteInfo.phone}</span>
              </a>
              <a className={styles.contactRow} href={`mailto:${siteInfo.email}`}>
                <MailIcon width={16} height={16} />
                <span>{siteInfo.email}</span>
              </a>
              {siteInfo.hours.map((entry) => (
                <div className={styles.hoursRow} key={entry.day}>
                  <span className={styles.contactRow}>
                    <ClockIcon width={16} height={16} />
                    {entry.day}
                  </span>
                  <span>{entry.time}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className={styles.heading}>Newsletter</h3>
            <p className={styles.newsletterText}>Get news on new dishes, offers, and events.</p>
            <form
              className={styles.newsletterForm}
              onSubmit={(event) => void handleSubmit(onSubmit)(event)}
              noValidate
            >
              <label htmlFor="footer-newsletter-email" className="sr-only">
                Email address
              </label>
              <input
                id="footer-newsletter-email"
                className={styles.newsletterInput}
                type="email"
                placeholder="you@example.com"
                aria-invalid={Boolean(errors.email)}
                {...register('email')}
              />
              <button
                type="submit"
                className={styles.socialLink}
                aria-label="Subscribe"
                disabled={isSubmitting}
                style={{ width: '44px', flexShrink: 0 }}
              >
                <MailIcon width={18} height={18} />
              </button>
            </form>
            {errors.email ? (
              <p className={cn(styles.newsletterStatus, styles.newsletterStatusError)}>
                {errors.email.message}
              </p>
            ) : null}
            {status === 'success' ? (
              <p className={cn(styles.newsletterStatus, styles.newsletterStatusSuccess)}>
                Subscribed! Thanks for joining us.
              </p>
            ) : null}
          </div>
        </div>

        <div className={styles.bottom}>
          <div className={styles.notices}>
            {siteInfo.notices.map((notice) => (
              <span key={notice}>{notice}</span>
            ))}
          </div>
          <span>
            &copy; {new Date().getFullYear()} {siteInfo.name}. All rights reserved.
          </span>
        </div>
      </Container>
    </footer>
  );
}
