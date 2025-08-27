import { useEffect } from "react";

import React from "react";
import { ScrollView, View, Text } from "react-native";
import { StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native";

const DisplayToggle = ({ label, active, onPress }) => {
  console.log(label);
  return (
    <TouchableOpacity
      style={[
        styles.optionButton,
        {
          backgroundColor: active ? "#586DFF" : "transparent",
        },
      ]}
      onPress={onPress}
    >
      <Text
        style={[
          styles.bttnTxt,
          {
            color: active ? "white" : "#586DFF",
          },
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
};

export default DisplayToggle;

const styles = StyleSheet.create({
  optionButton: {
    backgroundColor: "#3c4cbb",
    padding: 3,
    paddingTop: 0,
    marginBlock: 5,
    borderRadius: 5,
    minWidth: "48%",
    minHeight: 40,
    borderStyle: "solid",
    borderWidth: 2,
    borderColor: "#3c4cbb",
  },

  bttnTxt: {
    fontSize: 22,
    textAlign: "center",
    color: "white",
    lineHeight: 35,
  },
});
