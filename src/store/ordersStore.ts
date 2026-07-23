import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { generateDemoOrders } from '@/modules/admin/data/demoOrders';

export type OrderStatus = 'received' | 'preparing' | 'ready' | 'completed' | 'cancelled';
export type FulfillmentType = 'pickup' | 'delivery';

export interface OrderLine {
  menuItemId: string;
  itemName: string;
  quantity: number;
  unitPrice: number;
  lineTotal: number;
}

export interface Order {
  id: string;
  orderNumber: number;
  customerName: string;
  customerPhone: string;
  fulfillmentType: FulfillmentType;
  status: OrderStatus;
  items: OrderLine[];
  total: number;
  createdAt: string;
}

interface OrdersState {
  orders: Order[];
  isDemoData: boolean;
  updateStatus: (id: string, status: OrderStatus) => void;
}

/**
 * Order history driving the admin KPI dashboard. Seeded once with demo data
 * (see `modules/admin/data/demoOrders.ts`) so the dashboard isn't empty.
 *
 * TODO: once a real ordering flow + backend (e.g. Supabase) exist, orders
 * should be written here from real checkouts instead of the seed, and
 * `isDemoData` should flip to false.
 */
export const useOrdersStore = create<OrdersState>()(
  persist(
    (set) => ({
      orders: generateDemoOrders(),
      isDemoData: true,

      updateStatus: (id, status) =>
        set((state) => ({
          orders: state.orders.map((order) => (order.id === id ? { ...order, status } : order)),
        })),
    }),
    { name: 'afd-orders' },
  ),
);
