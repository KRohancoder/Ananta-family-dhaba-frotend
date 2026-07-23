import type { OrderStatus } from '@/store/ordersStore';
import { useOrdersStore } from '@/store/ordersStore';
import { formatPrice } from '@/shared/utils/formatPrice';
import { Card } from '@/components/Card';
import { cn } from '@/lib/cn';
import styles from './OrderTable.module.css';
import type { OrderTableProps } from './OrderTable.types';

const statusOptions: OrderStatus[] = ['received', 'preparing', 'ready', 'completed', 'cancelled'];

export function OrderTable({ orders }: OrderTableProps) {
  const updateStatus = useOrdersStore((state) => state.updateStatus);

  if (orders.length === 0) {
    return (
      <Card>
        <p className={styles.empty}>No orders yet.</p>
      </Card>
    );
  }

  return (
    <Card padded={false} className={styles.card}>
      <div className={styles.tableScroll}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Order</th>
              <th>Customer</th>
              <th>Items</th>
              <th>Total</th>
              <th>Placed</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr
                key={order.id}
                className={cn(order.status === 'cancelled' && styles.rowCancelled)}
              >
                <td>#{order.orderNumber}</td>
                <td>
                  <p className={styles.customerName}>{order.customerName}</p>
                  <p className={styles.customerMeta}>
                    {order.customerPhone} · {order.fulfillmentType}
                  </p>
                </td>
                <td className={styles.itemsCell}>
                  {order.items.map((line) => `${line.quantity}× ${line.itemName}`).join(', ')}
                </td>
                <td className={styles.total}>{formatPrice(order.total)}</td>
                <td>{new Date(order.createdAt).toLocaleDateString('en-IN')}</td>
                <td>
                  <select
                    className={styles.statusSelect}
                    value={order.status}
                    onChange={(event) => updateStatus(order.id, event.target.value as OrderStatus)}
                  >
                    {statusOptions.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
