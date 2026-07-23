import { Card } from '@/components/Card';
import { formatPrice } from '@/shared/utils/formatPrice';
import styles from './RevenueChart.module.css';
import type { RevenueChartProps } from './RevenueChart.types';

export function RevenueChart({ points }: RevenueChartProps) {
  const maxRevenue = Math.max(...points.map((point) => point.revenue), 1);

  return (
    <Card className={styles.card}>
      <div className={styles.bars}>
        {points.map((point) => (
          <div key={point.monthLabel} className={styles.column}>
            <span className={styles.value}>{formatPrice(point.revenue)}</span>
            <div className={styles.barTrack}>
              <div
                className={styles.barFill}
                style={{ height: `${(point.revenue / maxRevenue) * 100}%` }}
              />
            </div>
            <span className={styles.label}>{point.monthLabel}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}
