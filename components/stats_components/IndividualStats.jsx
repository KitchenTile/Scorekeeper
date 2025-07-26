import { useEffect } from "react";

import React from "react";
import { ScrollView, View, Text } from "react-native-web";
import { useMatchStore } from "../../stores/store";
import { StyleSheet } from "react-native";
import { BarChart, PieChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";
import {
  playerErrorAcrossSetsOrganizer,
  playerPointsAcrossSetsOrganizer,
} from "../../utils/statsProcessor";

const IndividualStats = ({ player, set, sets, pointsOrError }) => {
  // const sets = useMatchStore((state) => state.sets);
  const playerPointsPerSet = playerPointsAcrossSetsOrganizer(
    sets,
    player
  ).playerPointsPerSet;
  const pointObj = playerPointsAcrossSetsOrganizer(sets, player).pointObj;
  const currentSetPointsObj = playerPointsAcrossSetsOrganizer(sets, player)
    .pointObjPerSet[set.number - 1];
  const playerErrorPerSet = playerErrorAcrossSetsOrganizer(
    sets,
    player
  ).playerErrorsPerSet;
  const errorObj = playerErrorAcrossSetsOrganizer(sets, player).errorObj;
  const currentSetErrorsObj = playerErrorAcrossSetsOrganizer(sets, player)
    .errorObjPerSet[set.number - 1];
  // console.log(playerErrorAcrossSetsOrganizer(sets, player));
  useEffect(() => {
    console.log("sets");
    console.log(sets);
  }, []);

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
        legendFontSize: 15,
      };
    }
  );

  const currentSetErrorPieData = Object.entries(currentSetErrorsObj).map(
    ([key, value], index) => {
      const hue = 205 + index * 4;
      const lightness = Math.max(30, 60 - value * 5);

      return {
        name: key,
        points: value,
        color: `hsl(${hue}, 100%, ${lightness}%)`,
        legendFontSize: 15,
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
        legendFontSize: 15,
      };
    }
  );

  const generalErrorPieData = Object.entries(errorObj).map(
    ([key, value], index) => {
      const hue = 205 + index * 4;
      const lightness = Math.max(30, 60 - value * 5);

      return {
        name: key,
        points: value,
        color: `hsl(${hue}, 100%, ${lightness}%)`,
        legendFontSize: 15,
      };
    }
  );

  const chartConfig = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 0.5,
    // paddingLeft: 10,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 3, // optional, default 3
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
    <View style={{ marginTop: 20 }}>
      <View>
        <Text style={styles.title}>
          {pointsOrError === "points" ? "Points" : "Errors"} Graph
        </Text>
        <View>
          {(pointsOrError === "points" ? barHasData : errorBarHasData) ? (
            <>
              <BarChart
                style={{
                  borderBlockColor: "red",
                  borderWidth: 2,
                }}
                data={pointsOrError === "points" ? barData : errorBarData}
                width={Dimensions.get("window").width * 0.85}
                height={220}
                chartConfig={chartConfig}
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
        <Text style={[styles.title, { marginTop: 20 }]}>
          Current Set {pointsOrError === "points" ? "Points" : "Errors"}
        </Text>
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
              width={Dimensions.get("window").width * 0.85}
              height={220}
              chartConfig={chartConfig}
              accessor={"points"}
              backgroundColor={"transparent"}
              paddingLeft={"30"}
              // center={[10, 50]}
              absolute
            />
            <Text style={styles.placeholder}>
              Type of {pointsOrError === "points" ? "point" : "error"}
            </Text>
          </>
        ) : (
          <Text style={styles.placeholder}>No data to show in pie chart.</Text>
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
      <View>
        <Text style={styles.title}>
          All Sets {pointsOrError === "points" ? "Points" : "Errors"}
        </Text>
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
              width={Dimensions.get("window").width * 0.85}
              height={220}
              chartConfig={chartConfig}
              accessor={"points"}
              backgroundColor={"transparent"}
              paddingLeft={"30"}
              // center={[10, 50]}
              absolute
            />
            <Text style={styles.placeholder}>Type of point</Text>
            <View
              style={{
                marginBlock: 15,
                height: 2,
                width: "90%",
                alignSelf: "center",
                backgroundColor: "rgba(58,70,78,1.00)",
              }}
            />
          </>
        ) : (
          <Text style={styles.placeholder}>No data to show in pie chart.</Text>
        )}
      </View>
    </View>
  );
};

export default IndividualStats;

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    color: "white",
    marginBottom: 10,
  },
  placeholder: {
    textAlign: "center",
    color: "#ccc",
    fontStyle: "italic",
    marginVertical: 20,
  },
});

const POINTMETHODS = ["Ace", "Block", "KILL", "TIP"];
