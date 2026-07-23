import { menuCategories } from '@/modules/menu/data/menuData';
import type { Order, OrderLine, OrderStatus } from '@/store/ordersStore';

const popularItemIds = [
  'cmc-butter-chicken',
  'khapsa-chicken',
  'vmc-paneer-tikka-masala',
  'tandoor-chicken',
  'ccs-lollypop',
  'vmc-veg-handi',
  'nvrn-chi-fried-rice',
  'cmc-masala',
  'ccs-chilly',
  'vs-paneer-chilly',
  'roti-butter-nan',
  'soup-chicken-clear',
];

const customerNames = [
  'Rahul Sharma',
  'Priya Deshmukh',
  'Amit Patil',
  'Sneha Kulkarni',
  'Vikram Joshi',
  'Anjali More',
  'Suresh Yadav',
  'Pooja Shinde',
];

const allItems = menuCategories.flatMap((category) => category.items);

function priceOf(itemId: string): number {
  const item = allItems.find((candidate) => candidate.id === itemId);
  if (!item) return 0;
  return item.price ?? item.full ?? item.half ?? 0;
}

function nameOf(itemId: string): string {
  return allItems.find((candidate) => candidate.id === itemId)?.name ?? itemId;
}

/** Deterministic pseudo-random generator so demo data is stable across reloads/tests. */
function mulberry32(seed: number) {
  let state = seed;
  return () => {
    state |= 0;
    state = (state + 0x6d2b79f5) | 0;
    let t = Math.imul(state ^ (state >>> 15), 1 | state);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const STATUS_POOL: OrderStatus[] = [
  'completed',
  'completed',
  'completed',
  'completed',
  'preparing',
  'received',
  'cancelled',
];

/**
 * Generates a realistic-looking, deterministic set of demo orders spread
 * across the last 90 days, so the admin dashboard has something to show
 * before real orders exist.
 *
 * TODO: replace this with real order history (from a future ordering flow +
 * backend) once one is built — this dataset exists purely to demo the KPI
 * dashboard's shape.
 */
export function generateDemoOrders(count = 48): Order[] {
  const random = mulberry32(42);
  const now = Date.now();
  const ninetyDaysMs = 90 * 24 * 60 * 60 * 1000;

  const orders: Order[] = [];

  for (let i = 0; i < count; i += 1) {
    const daysAgoMs = random() * ninetyDaysMs;
    const createdAt = new Date(now - daysAgoMs).toISOString();

    const lineCount = 1 + Math.floor(random() * 3);
    const items: OrderLine[] = [];
    const usedIds = new Set<string>();

    for (let lineIndex = 0; lineIndex < lineCount; lineIndex += 1) {
      let itemId = popularItemIds[Math.floor(random() * popularItemIds.length)];
      let attempts = 0;
      while (usedIds.has(itemId) && attempts < 5) {
        itemId = popularItemIds[Math.floor(random() * popularItemIds.length)];
        attempts += 1;
      }
      usedIds.add(itemId);

      const quantity = 1 + Math.floor(random() * 3);
      const unitPrice = priceOf(itemId);
      items.push({
        menuItemId: itemId,
        itemName: nameOf(itemId),
        quantity,
        unitPrice,
        lineTotal: unitPrice * quantity,
      });
    }

    const total = items.reduce((sum, line) => sum + line.lineTotal, 0);
    const status = STATUS_POOL[Math.floor(random() * STATUS_POOL.length)];
    const customerName = customerNames[Math.floor(random() * customerNames.length)];

    orders.push({
      id: `demo-order-${i + 1}`,
      orderNumber: i + 1,
      customerName,
      customerPhone: `98${String(10000000 + Math.floor(random() * 89999999))}`,
      fulfillmentType: random() > 0.5 ? 'delivery' : 'pickup',
      status,
      items,
      total,
      createdAt,
    });
  }

  return orders.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
}
