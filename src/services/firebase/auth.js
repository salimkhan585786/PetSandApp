import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { useAuthStore } from '../../store/authStore';

export async function sendOTP(phoneNumber) {
  // Format: +91XXXXXXXXXX
  const formatted = phoneNumber.startsWith('+91') ? phoneNumber : `+91${phoneNumber}`;
  const confirmation = await auth().signInWithPhoneNumber(formatted);
  return confirmation;
}

export async function verifyOTP(confirmation, code) {
  const credential = await confirmation.confirm(code);
  const uid = credential.user.uid;
  const phone = credential.user.phoneNumber;

  // Check/create user doc in Firestore
  const userDoc = await firestore().collection('users').doc(uid).get();

  if (!userDoc.exists) {
    // New user — create doc
    await firestore().collection('users').doc(uid).set({
      phone,
      role: 'user',
      createdAt: firestore.FieldValue.serverTimestamp(),
      numCats: 1,
      preferredScent: null,
    });
    useAuthStore.getState().setUser(uid, phone, 'user');
    return { isNew: true, role: 'user' };
  } else {
    const data = userDoc.data();
    useAuthStore.getState().setUser(uid, phone, data.role);
    return { isNew: false, role: data.role };
  }
}
