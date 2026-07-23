import { PageMeta } from '@/components/PageMeta';
import { SectionHeading } from '@/components/SectionHeading';
import { formatPrice } from '@/shared/utils/formatPrice';
import { useOrdersStore } from '@/store/ordersStore';
import { RevenueChart } from '../components/RevenueChart';
import { StatCard } from '../components/StatCard';
import { TopDishesList } from '../components/TopDishesList';
import { computeMonthlyRevenue, computeOrderStats, computeTopDishes } from '../utils/computeStats';
import styles from './DashboardPage.module.css';

export function DashboardPage() {
  const orders = useOrdersStore((state) => state.orders);
  const stats = computeOrderStats(orders);
  const topDishes = computeTopDishes(orders);
  const monthlyRevenue = computeMonthlyRevenue(orders);

  return (
    <>
      <PageMeta title="Owner Dashboard" />
      <SectionHeading eyebrow="Overview" title="Dashboard" />

      <div className={styles.statGrid}>
        <StatCard label="Orders this month" value={String(stats.thisMonthOrders)} />
        <StatCard label="Revenue this month" value={formatPrice(stats.thisMonthRevenue)} />
        <StatCard label="Total orders" value={String(stats.totalOrders)} />
        <StatCard label="Lifetime revenue" value={formatPrice(stats.lifetimeRevenue)} />
      </div>

      <div className={styles.panels}>
        <section className={styles.panel}>
          <h3 className={styles.panelTitle}>Monthly Revenue</h3>
          <RevenueChart points={monthlyRevenue} />
        </section>

        <section className={styles.panel}>
          <h3 className={styles.panelTitle}>Top Dishes</h3>
          <TopDishesList dishes={topDishes} />
        </section>
      </div>
    </>
  );
}
