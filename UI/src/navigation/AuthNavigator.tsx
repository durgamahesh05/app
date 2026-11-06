import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { lazyScreen } from './lazyScreen';
import { AuthStackParamList } from './types';

const LoginScreen = lazyScreen(() => import('../screens/auth/LoginScreen'));
const RegisterScreen = lazyScreen(() => import('../screens/auth/RegisterScreen'));
const ForgotPasswordScreen = lazyScreen(() => import('../screens/auth/ForgotPasswordScreen'));
const VerifyOTPScreen = lazyScreen(() => import('../screens/auth/VerifyOTPScreen'));
const ResetPasswordScreen = lazyScreen(() => import('../screens/auth/ResetPasswordScreen'));

const Stack = createNativeStackNavigator<AuthStackParamList>();
export default function AuthNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
      <Stack.Screen name="VerifyOTP" component={VerifyOTPScreen} />
      <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
    </Stack.Navigator>
  );
}
