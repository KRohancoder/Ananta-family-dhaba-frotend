import { PageMeta } from '@/components/PageMeta';
import { AboutTeaser } from '../components/AboutTeaser';
import { FeaturedMenu } from '../components/FeaturedMenu';
import { Hero } from '../components/Hero';
import { ReserveCta } from '../components/ReserveCta';
import { UspStrip } from '../components/UspStrip';

export function HomePage() {
  return (
    <>
      <PageMeta
        title="Anant Family Dhaba"
        description="Authentic dhaba-style Veg, Chicken, Tandoori and Chinese food. Dine in with the family — view our menu or reserve a table."
      />
      <Hero />
      <UspStrip />
      <FeaturedMenu />
      <AboutTeaser />
      <ReserveCta />
    </>
  );
}
