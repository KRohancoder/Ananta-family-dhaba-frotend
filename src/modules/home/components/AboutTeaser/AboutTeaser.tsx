import { Link } from 'react-router-dom';
import { Button } from '@/components/Button';
import { Container } from '@/components/Container';
import { SectionHeading } from '@/components/SectionHeading';
import logo from '@/shared/assets/images/logo.jpg';
import { siteInfo } from '@/shared/constants/site';
import styles from './AboutTeaser.module.css';

export function AboutTeaser() {
  return (
    <section className={styles.section}>
      <Container>
        <div className={styles.grid}>
          <div className={styles.imageWrap}>
            <img className={styles.image} src={logo} alt={`${siteInfo.name} logo`} />
          </div>
          <div className={styles.text}>
            <SectionHeading eyebrow="Our Story" title="A Dhaba Built for the Whole Family" />
            <p>
              {siteInfo.name} brings the highway-dhaba tradition of bold spices and generous
              portions to a comfortable, family-friendly dining room — from Veg Handi and Paneer
              Tikka Masala to Chicken Khapsa and Tandoori favourites.
            </p>
            <div className={styles.notices}>
              {siteInfo.notices.map((notice) => (
                <span className={styles.notice} key={notice}>
                  {notice}
                </span>
              ))}
            </div>
            <Button as={Link} to="/about" variant="ghost">
              Read Our Story
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
