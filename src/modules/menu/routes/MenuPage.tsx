import { useState } from 'react';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { PageMeta } from '@/components/PageMeta';
import { SectionHeading } from '@/components/SectionHeading';
import { Container } from '@/components/Container';
import { CategoryNav } from '../components/CategoryNav';
import { CategorySection } from '../components/CategorySection';
import { DietFilter } from '../components/DietFilter';
import type { DietFilterValue } from '../components/DietFilter';
import { useMenu } from '../hooks/useMenu';
import styles from './MenuPage.module.css';

export function MenuPage() {
  const [dietFilter, setDietFilter] = useState<DietFilterValue>('all');
  const { data: categories, isLoading, isError } = useMenu();

  return (
    <>
      <PageMeta
        title="Menu"
        description="Explore the full Anant Family Dhaba menu — Veg, Chicken, Tandoori, Chinese starters, Khapsa Rice and more, with half and full portion pricing."
      />
      <div className={styles.hero}>
        <Container>
          <SectionHeading
            eyebrow="Fresh Daily"
            title="Our Menu"
            titleDevanagari="आमचा मेनू"
            description="Half and full portion pricing shown where available. All dishes are cooked to order."
            align="center"
          />
          <div className={styles.filterRow}>
            <DietFilter value={dietFilter} onChange={setDietFilter} />
          </div>
        </Container>
      </div>

      {isLoading ? <LoadingSpinner label="Loading menu…" fullScreen /> : null}

      {isError ? (
        <Container>
          <p className={styles.errorState}>
            Couldn&apos;t load the menu right now. Please refresh, or call us and we&apos;ll talk
            you through it.
          </p>
        </Container>
      ) : null}

      {categories ? (
        <Container>
          <CategoryNav categories={categories} />
          <div className={styles.list}>
            {categories.map((category) => (
              <CategorySection key={category.id} category={category} dietFilter={dietFilter} />
            ))}
          </div>
        </Container>
      ) : null}
    </>
  );
}
