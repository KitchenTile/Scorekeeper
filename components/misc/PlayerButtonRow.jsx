import {
  Animated,
  Easing,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useRef, useState } from "react";
import { useMatchStore } from "../../stores/store";

const PlayerButtonRow = ({ labels, active, onChange }) => {
  const [open, setOpen] = useState(true);

  const openedButton = useMatchStore((state) => state.openedButton);

  //   const isSideOpen = sideIds.includes(openedButton.active);

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
    outputRange: labels.length < 7 ? [0, 50] : [0, 100],
  });

  return (
    openedButton.active === null && (
      <View>
        <TouchableOpacity
          onPress={toggleOpen}
          style={[
            styles.playerBtn,
            { position: "absolute", top: -58, left: 236 },
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
    )
  );
};

export default PlayerButtonRow;

const styles = StyleSheet.create({
  wrapper: {},
  toggleRow: {
    flexDirection: "row",
    justifyContent: "flex-start",
    flexWrap: "wrap",
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
