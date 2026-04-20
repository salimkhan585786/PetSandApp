import firestore from '@react-native-firebase/firestore';
import { DELIVERY_SLOTS } from '../../constants/slots';

export async function getSlotAvailability(date) {
  const results = await Promise.all(
    DELIVERY_SLOTS.map(async (slot) => {
      const snap = await firestore()
        .collection('orders')
        .where('slotId', '==', slot.id)
        .where('deliveryDate', '==', date)
        .where('status', 'not-in', ['cancelled', 'refunded'])
        .get();

      const usedUnits = snap.docs.reduce(
        (sum, d) => sum + (d.data().slotUnits ?? 1),
        0
      );
      return { ...slot, usedUnits, available: usedUnits < slot.maxUnits };
    })
  );
  return results;
}

// Atomic slot booking with transaction
export async function bookSlot(orderId, slotId, slotUnits, date) {
  return firestore().runTransaction(async (tx) => {
    const slotOrders = await tx.get(
      firestore()
        .collection('orders')
        .where('slotId', '==', slotId)
        .where('deliveryDate', '==', date)
    );
    const used = slotOrders.docs.reduce(
      (s, d) => s + (d.data().slotUnits ?? 1),
      0
    );
    const slot = DELIVERY_SLOTS.find((s) => s.id === slotId);
    if (!slot) throw new Error('Slot not found');
    if (used + slotUnits > slot.maxUnits) throw new Error('Slot full');
    tx.update(firestore().collection('orders').doc(orderId), {
      slotId,
      slotUnits,
    });
  });
}
