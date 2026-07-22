import { Link } from 'react-router-dom';
import { Badge } from '@/components/Badge';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { Container } from '@/components/Container';
import { SectionHeading } from '@/components/SectionHeading';
import { getMenuItemsByIds } from '@/modules/menu/utils/getMenuItems';
import { formatPriceRange } from '@/shared/utils/formatPrice';
import styles from './FeaturedMenu.module.css';

const featuredIds = [
  'cmc-butter-chicken',
  'khapsa-chicken',
  'vmc-paneer-tikka-masala',
  'tandoor-chicken',
  'ccs-lollypop',
  'vmc-veg-handi',
];

export function FeaturedMenu() {
  const items = getMenuItemsByIds(featuredIds);

  return (
    <section className={styles.section}>
      <Container>
        <SectionHeading
          eyebrow="Customer Favourites"
          title="From Our Menu"
          description="A few dishes our regulars keep coming back for — see the full menu for everything we cook."
          align="center"
        />
        <div className={styles.grid}>
          {items.map((item) => (
            <Card hoverable key={item.id}>
              <div className={styles.item}>
                <div>
                  <h3 className={styles.itemName}>{item.name}</h3>
                  <p className={styles.itemDevanagari}>{item.nameDevanagari}</p>
                  <Badge tone={item.diet}>{item.diet === 'veg' ? 'Veg' : 'Non-Veg'}</Badge>
                </div>
                <span className={styles.price}>
                  {formatPriceRange(item.half, item.full ?? item.price)}
                </span>
              </div>
            </Card>
          ))}
        </div>
        <div className={styles.footer}>
          <Button as={Link} to="/menu" variant="secondary" size="lg">
            View Full Menu
          </Button>
        </div>
      </Container>
    </section>
  );
}
