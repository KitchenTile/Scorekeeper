import React from "react";
import { View, Text, StyleSheet } from "react-native";

const StatsComponent = ({ team, score, scoreDetails }) => {
  const countMethods = (array) => {
    const counter = {};
    array.forEach((method) => {
      counter[method] = (counter[method] || 0) + 1;
    });
    return counter;
  };

  const scores = scoreDetails?.map((point) => {
    const ourScores = point.type === team;
    if (ourScores) {
      return point.method;
    }
  });

  const stats = countMethods(scores);

  const updatedStats = Object.fromEntries(
    Object.entries(stats).filter(([key]) => key !== "undefined")
  );

  console.log(Object.entries(updatedStats));

  // console.log(kills);
  return (
    <View style={styles.info}>
      <Text style={styles.infoTitle}>{team}'S STATS</Text>
      <Text style={styles.text}>Points: {score}</Text>
      {Object.entries(updatedStats).map((stat) => (
        <Text style={styles.text}>
          {stat[0]}s: {stat[1]}
        </Text>
      ))}
    </View>
  );
};

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
