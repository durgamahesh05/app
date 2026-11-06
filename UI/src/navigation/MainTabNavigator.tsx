import React from 'react';
import { View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Users, Contact, Activity, MessageCircle, UserRound } from 'lucide-react-native';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { alpha } from '../constants/colors';
import { lazyScreen } from './lazyScreen';

const GroupsScreen = lazyScreen(() => import('../screens/groups/GroupsScreen'));
const FriendsScreen = lazyScreen(() => import('../screens/friends/FriendsScreen'));
const ActivityScreen = lazyScreen(() => import('../screens/activity/ActivityScreen'));
const ChatScreen = lazyScreen(() => import('../screens/chat/ChatScreen'));
const AccountScreen = lazyScreen(() => import('../screens/account/AccountScreen'));

const Tab = createBottomTabNavigator();
const icons: Record<string, any> = { Groups: Users, Friends: Contact, Activity, AIChat: MessageCircle, Account: UserRound };

export default function MainTabNavigator() {
  const { theme } = useTheme();
  const { t } = useLanguage();
  const label: Record<string, string> = { Groups: t('groups'), Friends: t('friends'), Activity: t('activity'), AIChat: t('aiChat'), Account: t('account') };
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarLabel: label[route.name],
        tabBarActiveTintColor: theme.nav,
        tabBarInactiveTintColor: theme.muted,
        tabBarStyle: { backgroundColor: theme.card, borderTopColor: theme.border, height: 66, paddingBottom: 8, paddingTop: 4 },
        tabBarLabelStyle: { fontSize: 11, fontWeight: '600' },
        tabBarIcon: ({ color, focused }) => {
          const Icon = icons[route.name];
          return (
            <View style={{ paddingHorizontal: 16, paddingVertical: 4, borderRadius: 999, backgroundColor: focused ? alpha(theme.nav, 0.18) : 'transparent' }}>
              <Icon size={20} color={color} />
            </View>
          );
        },
      })}>
      <Tab.Screen name="Groups" component={GroupsScreen} />
      <Tab.Screen name="Friends" component={FriendsScreen} />
      <Tab.Screen name="Activity" component={ActivityScreen} />
      <Tab.Screen name="AIChat" component={ChatScreen} />
      <Tab.Screen name="Account" component={AccountScreen} />
    </Tab.Navigator>
  );
}
