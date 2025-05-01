import { Tabs } from 'expo-router';
import React from 'react';
import { Platform, View } from 'react-native';

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
          // tabBarIcon: ({ color }) => <FontAwesome6 name="volleyball" size={24} color={color} />,
          tabBarIcon: ({ color, focused }) => (
            <View style={{
              height: 38,
              alignItems: 'center',
              borderTopWidth: focused ? 2 : 0 ,
              transitionTimingFunction: "ease-in-out",
              transitionDuration: "0.2s",
              borderTopColor: focused ? '#586DFF' : 'transparent',
              paddingTop: 5,
              width: '200%',
            }}>
              <FontAwesome6 name="volleyball" size={24} color={color} />
            </View>
          ),
        }}
      />
            <Tabs.Screen
        name="stats"
        options={{
          title: 'Game Stats',
          tabBarIcon: ({ color, focused }) => (
            <View style={{
              height: 38,
              alignItems: 'center',
              borderTopColor: focused ? '#586DFF' : 'transparent',
              borderTopWidth: focused ? 2 : 0 ,
              transitionTimingFunction: "ease-in-out",
              transitionDuration: "0.2s",
              paddingTop: 5,
              width: '250%',
            }}>
              <AntDesign name="barschart" size={24} color={color} />
            </View>
          ),
        }}
      />
    </Tabs>
  );
}
