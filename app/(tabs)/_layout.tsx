import { Tabs } from 'expo-router';
import React, { useEffect, useRef } from 'react';
import { Animated, View } from 'react-native';
import TabIcon from '@/components/misc/TabIcon';

import { HapticTab } from '@/components/HapticTab';
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
          backgroundColor: '#161F23',
          borderTopWidth: 0,
          height: 60,
          paddingBottom: 0,
        },
        tabBarLabelStyle: {
          fontSize: 14,
          fontWeight: 'bold',
          paddingTop: 2
        }

      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Court',
          tabBarIcon: ({ color, focused }) => (
            <TabIcon focused={focused} color={color} iconName="volleyball" IconComponent={FontAwesome6}/>
          ),
        }}
      />
            <Tabs.Screen
        name="stats"
        options={{
          title: 'Game Stats',
          tabBarIcon: ({ color, focused }) => (
              <TabIcon focused={focused} color={color} iconName="barschart" IconComponent={AntDesign}/>
          ),
        }}
      />
    </Tabs>
  );
}
