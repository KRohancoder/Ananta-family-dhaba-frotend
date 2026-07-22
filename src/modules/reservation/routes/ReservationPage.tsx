import { Card } from '@/components/Card';
import { Container } from '@/components/Container';
import { PageMeta } from '@/components/PageMeta';
import { SectionHeading } from '@/components/SectionHeading';
import { siteInfo } from '@/shared/constants/site';
import { ReservationForm } from '../components/ReservationForm';
import styles from './ReservationPage.module.css';

export function ReservationPage() {
  return (
    <>
      <PageMeta
        title="Reserve a Table"
        description={`Book a table at ${siteInfo.name} — let us know your date, time, and party size.`}
      />

      <div className={styles.hero}>
        <Container>
          <SectionHeading eyebrow="Book Ahead" title="Reserve a Table" align="center" />
        </Container>
      </div>

      <section className={styles.section}>
        <Container>
          <div className={styles.wrapper}>
            <Card>
              <ReservationForm />
            </Card>
            <p className={styles.note}>
              For same-day or large group bookings, calling us directly at {siteInfo.phone} is
              fastest.
            </p>
          </div>
        </Container>
      </section>
    </>
  );
}
