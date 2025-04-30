import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const StatsComponent = ({ team, score, scoreDetails }) => {
  const [statsToDisplay, setStatsToDisplay] = useState("points");
  const [instructionsVisible, setInstructionsVisible] = useState(false);

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

    const mistakesscores = scoreDetails?.map((point) => {
      const ourScores = point.type !== team;
      if (ourScores) {
        return point.method;
      }
    });

    const points = Object.fromEntries(
      Object.entries(countMethods(scores)).filter(
        ([key]) => !MISTAKEMETHODS.map((word) => word).includes(key)
      )
    );

    const mistakes = Object.fromEntries(
      Object.entries(countMethods(mistakesscores))
        .filter(([key]) => MISTAKEMETHODS.map((word) => word).includes(key))
        .filter(([key]) => !key.includes("undefined"))
        .filter(([key]) => !key.includes("null"))
    );

    return { points, mistakes };
  };

  const mistakes = scoreDetails?.map((point) => {
    const oppTeam = point.type !== team;
    if (oppTeam) {
      if (point.reason === "Defence Mistake") {
        return point.method;
      } else return;
    }
  });

  return (
    <View style={styles.info}>
      <Text style={styles.infoTitle}>{team}'S STATS</Text>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
        }}
      >
        <TouchableOpacity onPress={() => setStatsToDisplay("points")}>
          <Text style={styles.text}>Points: {score}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setStatsToDisplay("mistakes")}>
          <Text style={[styles.text, { color: "rgba(220, 96, 91, 1.00)" }]}>
            Mistakes:{" "}
            {mistakes.filter((element) => element !== undefined).length}
          </Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          display: "grid",
          gridTemplateRows: "repeat(2, 1fr)",
          gridTemplateColumns: "repeat(3, 1fr)",
          justifyItems: "center",
          marginTop: 30,
        }}
      >
        {Object.entries(statOrganizer()[statsToDisplay]).map(([key, val]) => (
          <Text
            key={key}
            style={[
              styles.text,
              {
                color:
                  statsToDisplay === "mistakes"
                    ? "rgba(220, 96, 91, 1.00)"
                    : "white",
              },
            ]}
          >
            {key[0]}: {val}
          </Text>
        ))}
      </View>
      <View style={styles.line}></View>
      <View style={styles.horizontalLine}></View>
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

  horizontalLine: {
    height: 2,
    width: "20%",
    backgroundColor: "rgba(58,70,78,1.00)",
    position: "absolute",
    top: "55%",
    left: "50%",
    transform: "translateX(-50%)",
  },
});

const MISTAKEMETHODS = [
  "Communication",
  "Passing Error",
  "Serving Error",
  "Hitting Error",
  "undefined",
  "null",
];
