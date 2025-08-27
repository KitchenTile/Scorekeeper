import { useEffect } from "react";

import React from "react";
import { ScrollView, View, Text } from "react-native";
import { useMatchStore } from "../../stores/store";
import { StyleSheet } from "react-native";
import { BarChart, PieChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";
import {
  playerErrorAcrossSetsOrganizer,
  playerPointsAcrossSetsOrganizer,
} from "../../utils/statsProcessor";

const IndividualStats = ({ player, set, sets, pointsOrError, team }) => {
  const playerPointsPerSet = playerPointsAcrossSetsOrganizer(
    sets,
    player,
    team
  ).playerPointsPerSet;
  const pointObj = playerPointsAcrossSetsOrganizer(sets, player, team).pointObj;
  const currentSetPointsObj = playerPointsAcrossSetsOrganizer(
    sets,
    player,
    team
  ).pointObjPerSet[set.number - 1];
  const playerErrorPerSet = playerErrorAcrossSetsOrganizer(
    sets,
    player
  ).playerErrorsPerSet;
  const errorObj = playerErrorAcrossSetsOrganizer(sets, player).errorObj;
  const currentSetErrorsObj = playerErrorAcrossSetsOrganizer(sets, player)
    .errorObjPerSet[set.number - 1];

  const errorBarData = {
    labels: Object.entries(playerErrorPerSet).map(([key, value]) => {
      return key;
    }),
    datasets: [
      {
        data: Object.entries(playerErrorPerSet).map(([key, value]) => {
          return value;
        }),
      },
    ],
  };

  const barData = {
    labels: Object.entries(playerPointsPerSet).map(([key, value]) => {
      return key;
    }),
    datasets: [
      {
        data: Object.entries(playerPointsPerSet).map(([key, value]) => {
          return value;
        }),
      },
    ],
  };

  const currentSetPieData = Object.entries(currentSetPointsObj).map(
    ([key, value], index) => {
      const hue = 205 + index * 4;
      const lightness = Math.max(30, 60 - value * 5);

      return {
        name: key,
        points: value,
        color: `hsl(${hue}, 100%, ${lightness}%)`,
        legendFontColor: "rgb(204, 204, 204)",
        legendFontSize: 15,
      };
    }
  );

  const currentSetErrorPieData = Object.entries(currentSetErrorsObj).map(
    ([key, value], index) => {
      const hue = 1 + index * 4;
      const lightness = Math.max(10, 80 - value * 5);

      return {
        name: key,
        points: value,
        color: `hsl(${hue}, 100%, ${lightness}%)`,
        legendFontColor: "rgb(204, 204, 204)",
        legendFontSize: 14,
      };
    }
  );

  const generalPointPieData = Object.entries(pointObj).map(
    ([key, value], index) => {
      const hue = 205 + index * 4;
      const lightness = Math.max(30, 60 - value * 5);

      return {
        name: key,
        points: value,
        color: `hsl(${hue}, 100%, ${lightness}%)`,
        legendFontColor: "rgb(204, 204, 204)",
        legendFontSize: 15,
      };
    }
  );

  const generalErrorPieData = Object.entries(errorObj).map(
    ([key, value], index) => {
      const hue = 1 + index * 4;
      const lightness = Math.max(10, 80 - value * 5);

      return {
        name: key,
        points: value,
        color: `hsl(${hue - 5}, 100%, ${lightness}%)`,
        legendFontColor: "rgb(204, 204, 204)",
        legendFontSize: 14,
      };
    }
  );

  const chartConfig = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    labelColor: () => "rgb(204, 204, 204)",
    strokeWidth: 3,
    barPercentage: 0.8,
  };

  const currentSetPieHasData = currentSetPieData.some(
    (entry) => entry.points > 0
  );
  const currentSetErrorPieHasData = currentSetErrorPieData.some(
    (entry) => entry.points > 0
  );
  const geenralPieHasData = generalPointPieData.some(
    (entry) => entry.points > 0
  );
  const geenralErrorPieHasData = generalErrorPieData.some(
    (entry) => entry.points > 0
  );
  const barHasData = barData.datasets[0].data.some((val) => val > 0);
  const errorBarHasData = errorBarData.datasets[0].data.some((val) => val > 0);

  return (
    <View>
      <View>
        <Text style={styles.title}>
          {pointsOrError === "points" ? "Points" : "Errors"} Graph
        </Text>
        <View
          style={{
            borderRadius: 12,
            boxShadow: "rgb(22 22 22) 0px 4px 15px 2px",
            marginBottom: 15,
          }}
        >
          {(pointsOrError === "points" ? barHasData : errorBarHasData) ? (
            <>
              <BarChart
                data={pointsOrError === "points" ? barData : errorBarData}
                width={Dimensions.get("window").width * 0.85}
                // height={240}
                height={Dimensions.get("window").height * 0.27}
                showValuesOnTopOfBars
                chartConfig={{
                  backgroundGradientFrom: "rgba(0, 0, 0, 0)",
                  backgroundGradientFromOpacity: 0,
                  backgroundGradientTo: "rgba(0, 0, 0, 0)",
                  backgroundGradientToOpacity: 0,
                  decimalPlaces: 0,
                  color: (opacity = 1) =>
                    pointsOrError === "points"
                      ? `rgba(98, 179, 255, ${opacity})`
                      : "rgb(253, 98, 95)",
                  labelColor: () => "rgb(204, 204, 204)",
                  barPercentage: 0.7,
                  barRadius: 6,
                  style: {
                    borderRadius: 10,
                  },
                  propsForBackgroundLines: {
                    stroke: "transparent",
                  },
                  propsForLabels: {
                    fontSize: 13,
                    fontWeight: "600",
                  },
                }}
                style={{
                  transform: [{ translateX: -30 }, { translateY: 20 }],
                }}
                fromZero={true}
              />
              <Text style={styles.placeholder}>
                {pointsOrError === "points" ? "points" : "errors"} per set
              </Text>
            </>
          ) : (
            <Text style={styles.placeholder}>
              No data to show in bar chart.
            </Text>
          )}
        </View>
        <View
          style={{
            marginBlock: 15,
            height: 2,
            width: "90%",
            alignSelf: "center",
            backgroundColor: "rgba(58,70,78,1.00)",
          }}
        />
        <Text style={[styles.title]}>
          Current Set {pointsOrError === "points" ? "Points" : "Errors"}
        </Text>
        <View
          style={{
            borderRadius: 12,
            boxShadow: "rgb(22 22 22) 0px 4px 15px 2px",
            marginBottom: 15,
          }}
        >
          {(
            pointsOrError === "points"
              ? currentSetPieHasData
              : currentSetErrorPieHasData
          ) ? (
            <>
              <PieChart
                data={
                  pointsOrError === "points"
                    ? currentSetPieData
                    : currentSetErrorPieData
                }
                width={Dimensions.get("window").width * 0.8}
                // height={220}
                height={Dimensions.get("window").height * 0.248}
                chartConfig={chartConfig}
                accessor={"points"}
                center={[10, 0]}
                backgroundColor={"#161F23"}
                absolute
                style={{
                  "font-family": "Roboto, Helvetica, Arial, sans-serif",
                }}
              />
              <Text style={styles.placeholder}>
                Type of {pointsOrError === "points" ? "point" : "error"}
              </Text>
            </>
          ) : (
            <Text style={styles.placeholder}>
              No data to show in pie chart.
            </Text>
          )}
        </View>
      </View>
      <View
        style={{
          marginBlock: 15,
          height: 2,
          width: "90%",
          alignSelf: "center",
          backgroundColor: "rgba(58,70,78,1.00)",
        }}
      />
      <View>
        <Text style={styles.title}>
          All Sets {pointsOrError === "points" ? "Points" : "Errors"}
        </Text>
        <View
          style={{
            borderRadius: 12,
            boxShadow: "rgb(22 22 22) 0px 4px 15px 2px",
            marginBottom: 15,
          }}
        >
          {(
            pointsOrError === "points"
              ? geenralPieHasData
              : geenralErrorPieHasData
          ) ? (
            <>
              <PieChart
                data={
                  pointsOrError === "points"
                    ? generalPointPieData
                    : generalErrorPieData
                }
                width={Dimensions.get("window").width * 0.8}
                // height={220}
                height={Dimensions.get("window").height * 0.248}
                chartConfig={chartConfig}
                accessor={"points"}
                center={[10, 0]}
                backgroundColor={"#161F23"}
                absolute
                style={{
                  "font-family": "Roboto, Helvetica, Arial, sans-serif",
                }}
              />
              <Text style={styles.placeholder}>Type of point</Text>
            </>
          ) : (
            <Text style={styles.placeholder}>
              No data to show in pie chart.
            </Text>
          )}
        </View>
      </View>
    </View>
  );
};

export default IndividualStats;

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    color: "white",
    marginBlock: 10,
  },
  placeholder: {
    textAlign: "center",
    color: "#ccc",
    fontStyle: "italic",
    marginVertical: 20,
  },
});

const POINTMETHODS = ["Ace", "Block", "KILL", "TIP"];
