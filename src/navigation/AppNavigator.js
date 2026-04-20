import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ShoppingBag, Package, BookOpen, User } from 'lucide-react-native';
import HomeScreen from '../screens/user/HomeScreen';
import OrderHistoryScreen from '../screens/user/OrderHistoryScreen';
import LearnScreen from '../screens/user/LearnScreen';
import ProfileScreen from '../screens/user/ProfileScreen';

const Tab = createBottomTabNavigator();

export default function AppNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: { backgroundColor: '#FFFBF5', borderTopColor: '#F0E6D3' },
        tabBarActiveTintColor: '#D4520D',
        tabBarInactiveTintColor: '#9A8A7A',
        tabBarIcon: ({ color, size }) => {
          const icons = {
            Shop: ShoppingBag, Orders: Package,
            Learn: BookOpen, Profile: User
          };
          const Icon = icons[route.name];
          return <Icon color={color} size={size} />;
        },
      })}>
      <Tab.Screen name="Shop" component={HomeScreen} />
      <Tab.Screen name="Orders" component={OrderHistoryScreen} />
      <Tab.Screen name="Learn" component={LearnScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}