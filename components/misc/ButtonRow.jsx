import { Easing, StyleSheet, Text, View } from "react-native";
import React, { useRef, useState } from "react";
import { Animated } from "react-native";
import { TouchableOpacity } from "react-native";

const ButtonRow = ({ active, onChange, labels }) => {
  const [open, setOpen] = useState(true);

  const slideAnim = useRef(new Animated.Value(0)).current; // 0 = collapsed, 1 = expanded

  const toggleOpen = () => {
    Animated.timing(slideAnim, {
      toValue: open ? 0 : 1,
      duration: 250,
      useNativeDriver: false,
      easing: Easing.ease,
    }).start(() => {
      setOpen(!open);
    });
  };

  const heightInterpolate = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 50],
  });

  const widthInterpolate = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 110],
  });

  const unselectedLable = labels.find((val) => val !== active);

  return (
    <View style={styles.wrapper}>
      <TouchableOpacity onPress={toggleOpen} style={styles.btn}>
        <Text style={styles.text}>{active.toUpperCase()}</Text>
      </TouchableOpacity>
      <Animated.View
        style={[
          styles.hiddenContainer,
          { width: widthInterpolate, opacity: slideAnim },
        ]}
      >
        <TouchableOpacity
          style={styles.btn}
          onPress={() => {
            onChange(unselectedLable);
            toggleOpen();
          }}
        >
          <Text style={styles.text}>{unselectedLable.toUpperCase()}</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

export default ButtonRow;

const styles = StyleSheet.create({
  wrapper: {
    alignItems: "center",
    overflow: "hidden",
    flex: 1,
    flexDirection: "row",
  },
  btn: {
    backgroundColor: "#3c4cbb",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginVertical: 4,
    width: 110,
  },
  active: {
    backgroundColor: "#586DFF",
  },
  text: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  hiddenContainer: {
    overflow: "hidden",
    // maxHeight: 41,
  },
});
