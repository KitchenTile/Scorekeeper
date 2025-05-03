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
          // tabBarIcon: ({ color }) => <FontAwesome6 name="volleyball" size={24} color={color} />,
          tabBarIcon: ({ color, focused }) => (
            // <Animated.View style={{
            //   height: 38,
            //   alignItems: 'center',
            //   borderTopWidth: 2,
            //   borderTopColor: focused ? '#586DFF' : 'red',
            //   paddingTop: 5,
            //   width: focused ? '200%' : "100%" ,
            //   transitionProperty: "all",
            //   transitionTimingFunction: "ease-in-out",
            //   transitionDuration: "0.2s",
            // }}>
            //   <FontAwesome6 name="volleyball" size={24} color={color} />
            // </Animated.View>
            <TabIcon focused={focused} color={color} iconName="volleyball" IconComponent={FontAwesome6}/>
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
