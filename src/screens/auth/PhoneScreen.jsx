import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { sendOTP } from '../../services/firebase/auth';

export default function PhoneScreen({ navigation }) {
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (phone.length !== 10) return Alert.alert('Enter valid 10-digit number');
    setLoading(true);
    try {
      const confirmation = await sendOTP(phone);
      navigation.navigate('OTP', { confirmation, phone });
    } catch (e) {
      Alert.alert('Error', 'Could not send OTP. Try again.');
    } finally { setLoading(false); }
  };

  return (
    <View className="flex-1 bg-sand-light px-6 justify-center">
      <Text className="text-3xl font-semibold text-cat mb-2">Welcome 🐾</Text>
      <Text className="text-base text-gray-500 mb-8">Enter your phone to continue</Text>
      <View className="flex-row items-center bg-white border border-gray-200 rounded-2xl px-4 mb-4">
        <Text className="text-gray-400 mr-2">+91</Text>
        <TextInput
          className="flex-1 text-lg py-4 text-cat"
          keyboardType="phone-pad"
          maxLength={10}
          value={phone}
          onChangeText={setPhone}
          placeholder="98765 43210" />
      </View>
      <TouchableOpacity
        className={`bg-accent rounded-2xl py-4 items-center ${loading ? 'opacity-60' : ''}`}
        onPress={handleSend} disabled={loading}>
        <Text className="text-white text-base font-semibold">
          {loading ? 'Sending...' : 'Send OTP'}</Text>
      </TouchableOpacity>
    </View>
  );
}