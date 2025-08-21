import { Tabs } from 'expo-router';
import React, { useEffect, useRef } from 'react';
import { Animated, Dimensions, View } from 'react-native';
import TabIcon from '@/components/misc/TabIcon';

import { HapticTab } from '@/components/HapticTab';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { AntDesign, FontAwesome6 } from '@expo/vector-icons';
import { useAuthStore } from '@/stores/store';

export default function TabLayout() {
  const colorScheme = useColorScheme();
    const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          backgroundColor: '#161F23',
          borderTopWidth: 0,
          height: Dimensions.get("window").height * 0.07875,
          paddingBottom: 0,
        },
        tabBarLabelStyle: {
          fontSize: 14,
          fontWeight: 'bold',
          paddingTop: 10
        }

      }}>
      <Tabs.Screen
        name="index"
        options={{
          tabBarActiveTintColor: "#586DFF",
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
          href: !isLoggedIn ? null : "/stats",
          tabBarActiveTintColor: "#586DFF",
          tabBarIcon: ({ color, focused }) => (
              <TabIcon focused={focused} color={color} iconName="barschart" IconComponent={AntDesign}/>
          ),
        }}
      />
    </Tabs>
  );
}
