import { Link } from 'react-router-dom';
import { Button } from '@/components/Button';
import { Container } from '@/components/Container';
import { cn } from '@/lib/cn';
import logo from '@/shared/assets/images/logo.jpg';
import { siteInfo } from '@/shared/constants/site';
import styles from './Hero.module.css';

export function Hero() {
  return (
    <section className={styles.hero}>
      <img className={styles.bgImage} src={logo} alt="" />
      <div className={styles.overlay} />
      <Container>
        <div className={styles.content}>
          <span className={styles.eyebrow}>Fresh off the tawa, every day</span>
          <h1 className={styles.title}>{siteInfo.name}</h1>
          <p className={cn(styles.titleDevanagari, 'lang-mr')}>{siteInfo.nameDevanagari}</p>
          <p className={styles.tagline}>
            Authentic dhaba-style Veg, Chicken, Tandoori and Chinese specialties, cooked to order
            and served warm for the whole family.
          </p>
          <div className={styles.actions}>
            <Button as={Link} to="/menu" size="lg">
              View Menu
            </Button>
            <Button as={Link} to="/reservation" variant="outline" size="lg">
              Reserve a Table
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
