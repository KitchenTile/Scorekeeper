import {
  Animated,
  Easing,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useRef, useState } from "react";

const PlayerButtonRow = ({ labels, active, onChange }) => {
  const [open, setOpen] = useState(true);

  console.log(active);

  const slideAnim = useRef(new Animated.Value(0)).current;

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

  return (
    <View>
      <TouchableOpacity
        onPress={toggleOpen}
        style={[
          styles.playerBtn,
          { position: "absolute", top: -65, left: 235 },
        ]}
      >
        <Text style={styles.playerText}>{active}</Text>
      </TouchableOpacity>
      <Animated.View
        style={[
          styles.toggleRow,
          { height: heightInterpolate, opacity: slideAnim },
        ]}
      >
        {labels.map((player) => (
          <TouchableOpacity
            key={player}
            style={[styles.playerBtn, active === player && styles.selected]}
            onPress={() => {
              onChange(player);
              toggleOpen();
            }}
          >
            <Text style={styles.playerText}>{player}</Text>
          </TouchableOpacity>
        ))}
      </Animated.View>
    </View>
  );
};

export default PlayerButtonRow;

const styles = StyleSheet.create({
  wrapper: {},
  toggleRow: {
    flexDirection: "row",
  },
  playerBtn: {
    margin: 5,
    borderRadius: 8,
    width: 41,
    height: 41,
    backgroundColor: "#3c4cbb",
    fontWeight: "bold",
  },
  selected: {
    backgroundColor: "#28a745",
    borderColor: "#28a745",
  },
  playerText: {
    color: "white",
    fontSize: 20,
    textAlign: "center",
    lineHeight: 40,
  },
});
