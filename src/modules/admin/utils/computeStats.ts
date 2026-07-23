import type { Order } from '@/store/ordersStore';

export interface DashboardStats {
  totalOrders: number;
  lifetimeRevenue: number;
  thisMonthOrders: number;
  thisMonthRevenue: number;
}

export function computeOrderStats(orders: Order[]): DashboardStats {
  const now = new Date();
  const activeOrders = orders.filter((order) => order.status !== 'cancelled');
  const thisMonthOrders = activeOrders.filter((order) => {
    const createdAt = new Date(order.createdAt);
    return createdAt.getFullYear() === now.getFullYear() && createdAt.getMonth() === now.getMonth();
  });

  return {
    totalOrders: activeOrders.length,
    lifetimeRevenue: activeOrders.reduce((sum, order) => sum + order.total, 0),
    thisMonthOrders: thisMonthOrders.length,
    thisMonthRevenue: thisMonthOrders.reduce((sum, order) => sum + order.total, 0),
  };
}

export interface TopDish {
  menuItemId: string;
  itemName: string;
  quantity: number;
  revenue: number;
}

export function computeTopDishes(orders: Order[], limit = 6): TopDish[] {
  const activeOrders = orders.filter((order) => order.status !== 'cancelled');
  const byItem = new Map<string, TopDish>();

  for (const order of activeOrders) {
    for (const line of order.items) {
      const existing = byItem.get(line.menuItemId);
      if (existing) {
        existing.quantity += line.quantity;
        existing.revenue += line.lineTotal;
      } else {
        byItem.set(line.menuItemId, {
          menuItemId: line.menuItemId,
          itemName: line.itemName,
          quantity: line.quantity,
          revenue: line.lineTotal,
        });
      }
    }
  }

  return [...byItem.values()].sort((a, b) => b.quantity - a.quantity).slice(0, limit);
}

export interface MonthlyRevenuePoint {
  monthLabel: string;
  revenue: number;
  orderCount: number;
}

export function computeMonthlyRevenue(orders: Order[], months = 6): MonthlyRevenuePoint[] {
  const activeOrders = orders.filter((order) => order.status !== 'cancelled');
  const now = new Date();
  const points: MonthlyRevenuePoint[] = [];

  for (let i = months - 1; i >= 0; i -= 1) {
    const monthDate = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const monthOrders = activeOrders.filter((order) => {
      const createdAt = new Date(order.createdAt);
      return (
        createdAt.getFullYear() === monthDate.getFullYear() &&
        createdAt.getMonth() === monthDate.getMonth()
      );
    });

    points.push({
      monthLabel: monthDate.toLocaleDateString('en-IN', { month: 'short', year: '2-digit' }),
      revenue: monthOrders.reduce((sum, order) => sum + order.total, 0),
      orderCount: monthOrders.length,
    });
  }

  return points;
}
