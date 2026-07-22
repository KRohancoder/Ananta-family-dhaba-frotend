import { Card } from '@/components/Card';
import { Container } from '@/components/Container';
import { PageMeta } from '@/components/PageMeta';
import { SectionHeading } from '@/components/SectionHeading';
import { ClockIcon, MailIcon, MapPinIcon, PhoneIcon } from '@/shared/assets/icons';
import { siteInfo } from '@/shared/constants/site';
import { ContactForm } from '../components/ContactForm';
import styles from './ContactPage.module.css';

export function ContactPage() {
  return (
    <>
      <PageMeta
        title="Contact Us"
        description={`Get in touch with ${siteInfo.name} — address, phone, hours, and a message form for questions or feedback.`}
      />

      <div className={styles.hero}>
        <Container>
          <SectionHeading eyebrow="Get in Touch" title="Contact Us" align="center" />
        </Container>
      </div>

      <section className={styles.section}>
        <Container>
          <div className={styles.grid}>
            <div className={styles.infoList}>
              <div className={styles.infoRow}>
                <span className={styles.infoIcon}>
                  <MapPinIcon width={18} height={18} />
                </span>
                <div>
                  <p className={styles.infoTitle}>Address</p>
                  <p className={styles.infoText}>{siteInfo.address}</p>
                </div>
              </div>
              <div className={styles.infoRow}>
                <span className={styles.infoIcon}>
                  <PhoneIcon width={18} height={18} />
                </span>
                <div>
                  <p className={styles.infoTitle}>Phone</p>
                  <p className={styles.infoText}>{siteInfo.phone}</p>
                </div>
              </div>
              <div className={styles.infoRow}>
                <span className={styles.infoIcon}>
                  <MailIcon width={18} height={18} />
                </span>
                <div>
                  <p className={styles.infoTitle}>Email</p>
                  <p className={styles.infoText}>{siteInfo.email}</p>
                </div>
              </div>
              <div className={styles.infoRow}>
                <span className={styles.infoIcon}>
                  <ClockIcon width={18} height={18} />
                </span>
                <div>
                  <p className={styles.infoTitle}>Hours</p>
                  {siteInfo.hours.map((entry) => (
                    <p className={styles.infoText} key={entry.day}>
                      {entry.day}: {entry.time}
                    </p>
                  ))}
                </div>
              </div>
            </div>

            <Card>
              <ContactForm />
            </Card>
          </div>
        </Container>
      </section>
    </>
  );
}
