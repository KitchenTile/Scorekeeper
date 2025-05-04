import React, { useEffect, useRef, useState } from "react";
import { Animated, View } from "react-native";

const TabIcon = ({ focused, IconComponent, iconName, color }) => {
  const borderAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(borderAnim, {
      toValue: focused ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [focused]);

  const borderColor = borderAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["transparent", "#586DFF"],
  });

  return (
    <Animated.View
      style={{
        borderTopWidth: 2,
        borderTopColor: borderColor,
        paddingTop: 5,
        alignItems: "center",
        height: 38,
        width: "200%",
      }}
    >
      <IconComponent name={iconName} size={24} color={color} />
    </Animated.View>
  );
};

export default TabIcon;
