import { beforeEach, describe, expect, it } from 'vitest';
import { useOffersStore } from './offersStore';

beforeEach(() => {
  useOffersStore.setState({ offers: [] });
});

describe('offersStore', () => {
  it('addOffer creates an active offer with a generated id', () => {
    useOffersStore.getState().addOffer({
      title: '10% off Chicken Starters',
      discountType: 'percent',
      discountValue: 10,
      scope: 'category',
      targetId: 'chicken-chini-starter',
      isActive: true,
    });

    const offers = useOffersStore.getState().offers;
    expect(offers).toHaveLength(1);
    expect(offers[0]).toMatchObject({ title: '10% off Chicken Starters', isActive: true });
    expect(offers[0].id).toBeTruthy();
  });

  it('toggleOfferActive flips isActive', () => {
    useOffersStore.getState().addOffer({
      title: 'Storewide 5% off',
      discountType: 'percent',
      discountValue: 5,
      scope: 'storewide',
      isActive: true,
    });
    const id = useOffersStore.getState().offers[0].id;

    useOffersStore.getState().toggleOfferActive(id);
    expect(useOffersStore.getState().offers[0].isActive).toBe(false);
  });

  it('removeOffer deletes the offer', () => {
    useOffersStore.getState().addOffer({
      title: 'Temp offer',
      discountType: 'flat',
      discountValue: 50,
      scope: 'storewide',
      isActive: true,
    });
    const id = useOffersStore.getState().offers[0].id;

    useOffersStore.getState().removeOffer(id);
    expect(useOffersStore.getState().offers).toHaveLength(0);
  });
});
