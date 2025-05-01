import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { AntDesign, FontAwesome6 } from '@expo/vector-icons';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: {
          backgroundColor: '#222',
          borderTopWidth: 0,
          height: 60,
          paddingBottom: 7,
        },
        tabBarLabelStyle: {
          fontSize: 14,
          fontWeight: 'bold',
        }

      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Court',
          tabBarIcon: ({ color }) => <FontAwesome6 name="volleyball" size={24} color={color} />,
        }}
      />
            <Tabs.Screen
        name="stats"
        options={{
          title: 'Game Stats',
          tabBarIcon: ({ color }) => <AntDesign name="barschart" size={24} color={color} />
        }}
      />
    </Tabs>
  );
}
