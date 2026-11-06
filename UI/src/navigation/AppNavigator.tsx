import React from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Loader from '../components/common/Loader';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../hooks/useAuth';
import { lazyScreen } from './lazyScreen';
import { RootStackParamList } from './types';

const AuthNavigator = lazyScreen(() => import('./AuthNavigator'));
const MainTabNavigator = lazyScreen(() => import('./MainTabNavigator'));
const ScanCodeScreen = lazyScreen(() => import('../screens/scan/ScanCodeScreen'));
const CreateGroupScreen = lazyScreen(() => import('../screens/groups/CreateGroupScreen'));
const JoinGroupScreen = lazyScreen(() => import('../screens/groups/JoinGroupScreen'));
const GroupDetailsScreen = lazyScreen(() => import('../screens/groups/GroupDetailsScreen'));
const ExpenseDetailsScreen = lazyScreen(() => import('../screens/expenses/ExpenseDetailsScreen'));
const SplitExpenseScreen = lazyScreen(() => import('../screens/expenses/SplitExpenseScreen'));
const ScanReceiptScreen = lazyScreen(() => import('../screens/receipt/ScanReceiptScreen'));
const ReceiptDetailsScreen = lazyScreen(() => import('../screens/receipt/ReceiptDetailsScreen'));
const EditProfileScreen = lazyScreen(() => import('../screens/account/EditProfileScreen'));
const SettingsScreen = lazyScreen(() => import('../screens/account/SettingsScreen'));
const LanguageScreen = lazyScreen(() => import('../screens/account/LanguageScreen'));
const InsightsScreen = lazyScreen(() => import('../screens/insights/InsightsScreen'));

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  const { theme } = useTheme();
  const { user, loading } = useAuth();
  const base = theme.mode === 'dark' ? DarkTheme : DefaultTheme;
  if (loading) return <Loader />;
  return (
    <NavigationContainer theme={{ ...base, colors: { ...base.colors, background: theme.bg, card: theme.card, text: theme.text, border: theme.border, primary: theme.nav } }}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {user ? (
          <>
            <Stack.Screen name="Main" component={MainTabNavigator} />
            <Stack.Screen name="ScanCode" component={ScanCodeScreen} options={{ presentation: 'fullScreenModal' }} />
            <Stack.Screen name="CreateGroup" component={CreateGroupScreen} />
            <Stack.Screen name="JoinGroup" component={JoinGroupScreen} />
            <Stack.Screen name="GroupDetails" component={GroupDetailsScreen} />
            <Stack.Screen name="ExpenseDetails" component={ExpenseDetailsScreen} />
            <Stack.Screen name="SplitExpense" component={SplitExpenseScreen} />
            <Stack.Screen name="ScanReceipt" component={ScanReceiptScreen} />
            <Stack.Screen name="ReceiptDetails" component={ReceiptDetailsScreen} />
            <Stack.Screen name="EditProfile" component={EditProfileScreen} />
            <Stack.Screen name="Settings" component={SettingsScreen} />
            <Stack.Screen name="Language" component={LanguageScreen} />
            <Stack.Screen name="Insights" component={InsightsScreen} />
          </>
        ) : (
          <Stack.Screen name="Auth" component={AuthNavigator} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
