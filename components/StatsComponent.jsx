import React from "react";
import { View, Text, StyleSheet } from "react-native";

function StatsComponent({ team, score, scoreDetails }) {
  // scoreDetails?.map((point) => {
  //   console.log(point.author);
  // });
  return (
    <View
      style={[
        styles.info,
        { backgroundColor: team === "MY TEAM" ? "#586DFF" : "#DC605B" },
      ]}
    >
      <Text style={styles.infoTitle}>{team}'S STATS</Text>
      <Text>Points: {score}</Text>
    </View>
  );
}

export default StatsComponent;

const styles = StyleSheet.create({
  info: {
    height: "100%",
    width: "50%",
    padding: 5,
  },

  infoTitle: {
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
});
