import { Link } from 'react-router-dom';
import { Button } from '@/components/Button';
import { Container } from '@/components/Container';
import { PageMeta } from '@/components/PageMeta';
import styles from './NotFoundPage.module.css';

export function NotFoundPage() {
  return (
    <>
      <PageMeta title="Page Not Found" />
      <section className={styles.section}>
        <Container>
          <p className={styles.code}>404</p>
          <h1>We couldn&apos;t find that page</h1>
          <p className={styles.text}>
            The page you&apos;re looking for may have moved. Try the menu or head back home.
          </p>
          <Button as={Link} to="/">
            Back to Home
          </Button>
        </Container>
      </section>
    </>
  );
}
