import { Container } from '@/components/Container';
import { ClockIcon, FlameIcon, LeafIcon, UsersIcon } from '@/shared/assets/icons';
import styles from './UspStrip.module.css';

const highlights = [
  {
    icon: FlameIcon,
    title: 'Fresh Off the Tawa',
    text: 'Every dish is cooked to order over a live flame, never pre-made.',
  },
  {
    icon: UsersIcon,
    title: 'Family Friendly Dining',
    text: 'A warm, welcoming dhaba atmosphere for the whole family.',
  },
  {
    icon: LeafIcon,
    title: 'Veg & Non-Veg Specialties',
    text: 'From Paneer Handi to Chicken Khapsa — something for everyone.',
  },
  {
    icon: ClockIcon,
    title: 'Worth the Wait',
    text: 'Orders take about 20 minutes — because fresh takes time.',
  },
] as const;

export function UspStrip() {
  return (
    <section className={styles.section}>
      <Container>
        <div className={styles.grid}>
          {highlights.map((item) => {
            const Icon = item.icon;
            return (
              <div className={styles.item} key={item.title}>
                <span className={styles.iconWrap}>
                  <Icon width={22} height={22} />
                </span>
                <div>
                  <h3 className={styles.itemTitle}>{item.title}</h3>
                  <p className={styles.itemText}>{item.text}</p>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
