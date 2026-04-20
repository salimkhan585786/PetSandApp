import RazorpayCheckout from 'react-native-razorpay';

export async function initiatePayment({ orderId, amount, phone, description }) {
  const options = {
    description,
    currency: 'INR',
    key: __DEV__ ? 'rzp_test_YOUR_KEY' : 'rzp_live_YOUR_KEY',
    amount: amount * 100, // paise
    name: 'PetSand',
    order_id: orderId,   // from your backend/Firebase Function
    prefill: { contact: phone },
    theme: { color: '#D4520D' },
    notes: { address: 'Mumbai, India' },
  };

  return new Promise((resolve, reject) => {
    RazorpayCheckout.open(options)
      .then(resolve)
      .catch(reject);
  });
}

// Note: Create Razorpay order via Firebase Cloud Function
// The 'order_id' must come from Razorpay Orders API, not your Firestore ID
