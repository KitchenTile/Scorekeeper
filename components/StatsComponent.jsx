import React from "react";
import { View, Text, StyleSheet } from "react-native";

const StatsComponent = ({ team, score, scoreDetails }) => {
  const statOrganizer = () => {
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

    return Object.fromEntries(
      Object.entries(stats).filter(([key]) => key !== "undefined")
    );
  };

  return (
    <View style={styles.info}>
      <Text style={styles.infoTitle}>{team}'S STATS</Text>
      <View
        style={{
          display: "grid",
          gridTemplateRows: "repeat(2, 1fr)",
          gridTemplateColumns: "repeat(2, 1fr)",
          justifyItems: "center",
        }}
      >
        <Text style={styles.text}>Points: {score}</Text>
        {Object.entries(statOrganizer()).map((stat) => (
          <Text style={styles.text}>
            {stat[0]}s: {stat[1]}
          </Text>
        ))}
      </View>
      <View style={styles.line}></View>
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
    fontSize: 16,
    color: "white",
    marginBottom: 5,
  },

  line: {
    height: "100%",
    width: 2,
    backgroundColor: "rgba(58,70,78,1.00)",
    position: "absolute",
    top: 0,
    left: "100%",
  },
});
