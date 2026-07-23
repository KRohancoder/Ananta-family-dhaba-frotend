import { Card } from '@/components/Card';
import styles from './StatCard.module.css';
import type { StatCardProps } from './StatCard.types';

export function StatCard({ label, value, hint, icon: Icon }: StatCardProps) {
  return (
    <Card className={styles.card}>
      <div className={styles.head}>
        <span className={styles.label}>{label}</span>
        {Icon ? <Icon className={styles.icon} width={20} height={20} /> : null}
      </div>
      <p className={styles.value}>{value}</p>
      {hint ? <p className={styles.hint}>{hint}</p> : null}
    </Card>
  );
}
