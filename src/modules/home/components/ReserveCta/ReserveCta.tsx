import { Link } from 'react-router-dom';
import { Button } from '@/components/Button';
import { Container } from '@/components/Container';
import { siteInfo } from '@/shared/constants/site';
import styles from './ReserveCta.module.css';

export function ReserveCta() {
  return (
    <section className={styles.section}>
      <Container narrow>
        <h2 className={styles.title}>Planning a Family Get-Together?</h2>
        <p className={styles.text}>
          Reserve your table in advance so it&apos;s ready when you arrive — or give us a call for
          same-day bookings.
        </p>
        <div className={styles.actions}>
          <Button as={Link} to="/reservation" size="lg">
            Reserve a Table
          </Button>
          <Button
            as="a"
            href={`tel:${siteInfo.phone.replace(/\s+/g, '')}`}
            variant="outline"
            size="lg"
          >
            Call {siteInfo.phone}
          </Button>
        </div>
      </Container>
    </section>
  );
}
