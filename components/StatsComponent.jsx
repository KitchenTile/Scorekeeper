import React from "react";
import { View, Text, StyleSheet } from "react-native";

function StatsComponent({ team, score, scoreDetails }) {
  // scoreDetails?.map((point) => {
  //   console.log(point.author);
  // });
  return (
    <View style={styles.info}>
      <Text style={styles.infoTitle}>{team}'S STATS</Text>
      <Text style={styles.text}>Points: {score}</Text>
    </View>
  );
}

export default StatsComponent;

const styles = StyleSheet.create({
  info: {
    height: "100%",
    width: "50%",
    paddingBlock: 10,
    paddingInline: 10,
  },

  infoTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "white",
  },

  text: {
    fontSize: 14,
    color: "white",
  },
});
