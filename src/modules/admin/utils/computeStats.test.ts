import { describe, expect, it } from 'vitest';
import type { Order } from '@/store/ordersStore';
import { computeOrderStats, computeTopDishes } from './computeStats';

function makeOrder(overrides: Partial<Order>): Order {
  return {
    id: 'order-1',
    orderNumber: 1,
    customerName: 'Test Customer',
    customerPhone: '9800000000',
    fulfillmentType: 'pickup',
    status: 'completed',
    items: [],
    total: 0,
    createdAt: new Date().toISOString(),
    ...overrides,
  };
}

describe('computeOrderStats', () => {
  it('excludes cancelled orders from totals', () => {
    const orders = [
      makeOrder({ id: 'a', total: 100, status: 'completed' }),
      makeOrder({ id: 'b', total: 500, status: 'cancelled' }),
    ];

    const stats = computeOrderStats(orders);
    expect(stats.totalOrders).toBe(1);
    expect(stats.lifetimeRevenue).toBe(100);
  });

  it('counts orders placed in the current month', () => {
    const orders = [makeOrder({ id: 'a', total: 200, createdAt: new Date().toISOString() })];
    const stats = computeOrderStats(orders);
    expect(stats.thisMonthOrders).toBe(1);
    expect(stats.thisMonthRevenue).toBe(200);
  });
});

describe('computeTopDishes', () => {
  it('ranks dishes by total quantity sold across orders', () => {
    const orders = [
      makeOrder({
        id: 'a',
        items: [
          {
            menuItemId: 'butter-chicken',
            itemName: 'Butter Chicken',
            quantity: 2,
            unitPrice: 200,
            lineTotal: 400,
          },
        ],
      }),
      makeOrder({
        id: 'b',
        items: [
          {
            menuItemId: 'butter-chicken',
            itemName: 'Butter Chicken',
            quantity: 3,
            unitPrice: 200,
            lineTotal: 600,
          },
          {
            menuItemId: 'veg-handi',
            itemName: 'Veg Handi',
            quantity: 1,
            unitPrice: 150,
            lineTotal: 150,
          },
        ],
      }),
    ];

    const topDishes = computeTopDishes(orders);
    expect(topDishes[0]).toMatchObject({
      menuItemId: 'butter-chicken',
      quantity: 5,
      revenue: 1000,
    });
    expect(topDishes[1]).toMatchObject({ menuItemId: 'veg-handi', quantity: 1 });
  });

  it('excludes cancelled orders', () => {
    const orders = [
      makeOrder({
        id: 'a',
        status: 'cancelled',
        items: [
          {
            menuItemId: 'butter-chicken',
            itemName: 'Butter Chicken',
            quantity: 10,
            unitPrice: 200,
            lineTotal: 2000,
          },
        ],
      }),
    ];

    expect(computeTopDishes(orders)).toHaveLength(0);
  });
});
