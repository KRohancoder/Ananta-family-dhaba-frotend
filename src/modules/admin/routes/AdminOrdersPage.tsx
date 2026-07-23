import { PageMeta } from '@/components/PageMeta';
import { SectionHeading } from '@/components/SectionHeading';
import { useOrdersStore } from '@/store/ordersStore';
import { OrderTable } from '../components/OrderTable';
import styles from './AdminOrdersPage.module.css';

export function AdminOrdersPage() {
  const orders = useOrdersStore((state) => state.orders);
  const sortedOrders = [...orders].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );

  return (
    <>
      <PageMeta title="Orders" />
      <SectionHeading eyebrow="Order History" title="Orders" />
      <div className={styles.tableWrap}>
        <OrderTable orders={sortedOrders} />
      </div>
    </>
  );
}
