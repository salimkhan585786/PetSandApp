import messaging from '@react-native-firebase/messaging';
import firestore from '@react-native-firebase/firestore';
import { Alert } from 'react-native';

export async function requestNotificationPermission() {
  const authStatus = await messaging().requestPermission();
  return (
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL
  );
}

export async function getFCMToken() {
  return await messaging().getToken();
}

export function listenToMessages() {
  // Foreground messages
  return messaging().onMessage(async (remoteMessage) => {
    Alert.alert(
      remoteMessage.notification?.title ?? 'PetSand',
      remoteMessage.notification?.body ?? ''
    );
  });
}

// Call on app start (App.js)
export async function setupNotifications(uid) {
  const granted = await requestNotificationPermission();
  if (!granted) return;
  const token = await getFCMToken();
  // Save FCM token to user doc for targeting
  await firestore().collection('users').doc(uid).update({ fcmToken: token });
}


