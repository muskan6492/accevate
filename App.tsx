import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Screens
import LoginScreen from './screens/LoginScreen';
import OtpScreen from './screens/otpScreen';
import DashboardScreen from './screens/DashboardScreen';
import ProfileScreen from './screens/ProfileScreen';
import StudentScreen from './screens/StudentScreen';
import FinancialScreen from './screens/FinancialScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState<string | null>(null);

  useEffect(() => {
    const bootstrapAsync = async () => {
      const token = await AsyncStorage.getItem('user_token');
      setUserToken(token);
      setIsLoading(false);
    };

    bootstrapAsync();
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f8fafc' }}>
        <View style={{ width: 80, height: 80, borderRadius: 40, backgroundColor: '#dbeafe', justifyContent: 'center', alignItems: 'center', marginBottom: 20 }}>
          <Text style={{ fontSize: 32 }}>🔒</Text>
        </View>
        <Text style={{ fontSize: 18, color: '#475569' }}>Loading...</Text>
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={userToken ? 'Dashboard' : 'Login'}
        screenOptions={{ headerShown: false, animation: 'slide_from_right' }}
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Otp" component={OtpScreen} />
        <Stack.Screen name="Dashboard" component={DashboardScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="StudentOverview" component={StudentScreen} />
        <Stack.Screen name="FinancialSummary" component={FinancialScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}