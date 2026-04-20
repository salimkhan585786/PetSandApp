import { useEffect, useState } from 'react';
import firestore from '@react-native-firebase/firestore';

export function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [maintenance, setMaintenance] = useState(false);
  const [maintenanceMsg, setMaintenanceMsg] = useState('');

  useEffect(() => {
    // Check maintenance toggle first
    const unsubConfig = firestore().doc('appConfig/main')
      .onSnapshot(snap => {
        const data = snap.data();
        setMaintenance(data?.maintenanceMode ?? false);
        setMaintenanceMsg(data?.maintenanceMessage ?? 'Back soon!');
      });

    const unsubProducts = firestore().collection('products')
      .where('inStock', '==', true)
      .onSnapshot(snap => {
        setProducts(snap.docs.map(d => ({ id: d.id, ...d.data() })));
        setLoading(false);
      });

    return () => { unsubConfig(); unsubProducts(); };
  }, []);

  return { products, loading, maintenance, maintenanceMsg };
}