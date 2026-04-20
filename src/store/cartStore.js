import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { mmkvStorage } from '../utils/storage';

export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      selectedSlot: null,
      deliveryAddress: null,

      addItem: (item) =>
        set((s) => {
          const exists = s.items.find((i) => i.productId === item.productId);
          if (exists) {
            return {
              items: s.items.map((i) =>
                i.productId === item.productId
                  ? { ...i, qty: i.qty + item.qty }
                  : i
              ),
            };
          }
          return { items: [...s.items, item] };
        }),

      removeItem: (id) =>
        set((s) => ({
          items: s.items.filter((i) => i.productId !== id),
        })),

      updateQty: (id, qty) =>
        set((s) => ({
          items: s.items.map((i) =>
            i.productId === id ? { ...i, qty } : i
          ),
        })),

      setSlot: (slotId) => set({ selectedSlot: slotId }),

      setAddress: (addr) => set({ deliveryAddress: addr }),

      clearCart: () => set({ items: [], selectedSlot: null }),

      totalSlotUnits: () =>
        get().items.reduce((sum, i) => sum + i.slotUnits * i.qty, 0),

      totalPrice: () =>
        get().items.reduce((sum, i) => sum + i.price * i.qty, 0),
    }),
    {
      name: 'cart-storage',
      storage: createJSONStorage(() => mmkvStorage),
    }
  )
);
