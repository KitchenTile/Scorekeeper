import { Easing, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { Animated } from "react-native";
import { TouchableOpacity } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useMatchStore } from "../../stores/store";

const ButtonRow = ({ active, onChange, labels, icons, id }) => {
  const [open, setOpen] = useState(false);
  const openedButton = useMatchStore((state) => state.openedButton);
  const setOpenedButton = useMatchStore((state) => state.setOpenedButton);

  const slideAnim = useRef(new Animated.Value(0)).current;

  const didMountRef = useRef(false);

  useEffect(() => {
    if (!didMountRef.current) {
      didMountRef.current = true;
      return;
    }

    const shouldClose =
      openedButton.active !== null && openedButton.active !== id && open;

    if (shouldClose) {
      toggleClose();
    }
  }, [openedButton]);

  const toggleOpen = () => {
    Animated.timing(slideAnim, {
      toValue: open ? 0 : 1,
      duration: 250,
      useNativeDriver: false,
      easing: Easing.ease,
    }).start(() => {
      setOpen(true);
      // setOpenedButton({ ...openedButton, open: true });
    });
  };

  const toggleClose = () => {
    Animated.timing(slideAnim, {
      toValue: open ? 0 : 1,
      duration: 250,
      useNativeDriver: false,
      easing: Easing.ease,
    }).start(() => {
      setOpen(false);
      setOpenedButton({ ...openedButton, active: null });
    });
  };

  const widthInterpolate = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 100],
  });

  const unselectedLable = labels.find((val) => val !== active);

  return (
    <View style={[styles.wrapper, styles.elevatedElement]}>
      <TouchableOpacity
        onPress={() => {
          setOpenedButton({ ...openedButton, active: id });
          open ? toggleClose() : toggleOpen();
        }}
        style={[
          styles.btn,
          open && {
            borderBottomRightRadius: 0,
            borderTopRightRadius: 0,
          },
        ]}
      >
        <FontAwesome
          name={active === labels[0] ? icons[0] : icons[1]}
          size={16}
          color="white"
          style={{ lineHeight: 21 }}
        />
        <Text style={styles.text}>{active.toUpperCase()}</Text>
      </TouchableOpacity>
      <Animated.View
        style={[
          styles.hiddenContainer,
          { opacity: slideAnim, width: widthInterpolate },
        ]}
      >
        <TouchableOpacity
          style={[
            styles.btn,

            open && {
              borderBottomLeftRadius: 0,
              borderTopLeftRadius: 0,
            },
          ]}
          onPress={() => {
            onChange(unselectedLable);
            setOpenedButton({ ...openedButton, active: id });
            toggleClose();
          }}
        >
          <FontAwesome
            name={active === labels[1] ? icons[0] : icons[1]}
            size={16}
            color="white"
            style={{ lineHeight: 21 }}
          />
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
    width: "auto",
    flexDirection: "row",
  },

  btn: {
    flexDirection: "row",
    gap: 10,
    backgroundColor: "#3c4cbb",
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    marginVertical: 4,
    width: 100,
    justifyContent: "center",
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
  },
});
