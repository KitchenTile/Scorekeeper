import { useEffect } from "react";

import React from "react";
import { ScrollView, View, Text } from "react-native-web";
import { useMatchStore } from "../../store";
import { StyleSheet } from "react-native";
import { BarChart, PieChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";
import {
  playerPointsAcrossSetsOrganizer,
  playersPointsPerSetOrganizer,
} from "../../utils/statsProcessor";

const IndividualStats = ({ player, set }) => {
  const sets = useMatchStore((state) => state.sets);
  const playerPointsPerSet = playerPointsAcrossSetsOrganizer(
    sets,
    player
  ).playerPointsPerSet;
  const pointObj = playerPointsAcrossSetsOrganizer(sets, player).pointObj;
  const currentSetPointsObj = playerPointsAcrossSetsOrganizer(sets, player)
    .pointObjPerSet[set.number - 1];

  //   useEffect(() => {
  //     console.log(sets);
  //   }, [sets]);

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

  const pieData = Object.entries(currentSetPointsObj).map(
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

  const pieData2 = Object.entries(pointObj).map(([key, value], index) => {
    const hue = 205 + index * 4;
    const lightness = Math.max(30, 60 - value * 5);

    return {
      name: key,
      points: value,
      color: `hsl(${hue}, 100%, ${lightness}%)`,
      legendFontSize: 15,
    };
  });

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

  const pieHasData = pieData.some((entry) => entry.points > 0);
  const pieHasData2 = pieData2.some((entry) => entry.points > 0);

  const barHasData = barData.datasets[0].data.some((val) => val > 0);

  return (
    <View style={{ marginTop: 20 }}>
      <View>
        <Text style={styles.title}>Points Graph</Text>
        <View>
          {barHasData ? (
            <>
              <BarChart
                style={{
                  // paddingRight: 0,
                  borderBlockColor: "red",
                  borderWidth: 2,
                }}
                data={barData}
                width={Dimensions.get("window").width * 0.85}
                height={220}
                chartConfig={chartConfig}
                fromZero={true}
              />
              <Text style={styles.placeholder}>Points per set</Text>
            </>
          ) : (
            <Text style={styles.placeholder}>
              No points data to show in bar chart.
            </Text>
          )}
        </View>
        <Text style={[styles.title, { marginTop: 20 }]}>
          Current Set Points
        </Text>
        {pieHasData ? (
          <>
            <PieChart
              data={pieData}
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
          </>
        ) : (
          <Text style={styles.placeholder}>
            No player {player} points to show in pie chart.
          </Text>
        )}
      </View>
      <View>
        <Text style={styles.title}>All Sets Points</Text>
        {pieHasData2 ? (
          <>
            <PieChart
              data={pieData2}
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
          </>
        ) : (
          <Text style={styles.placeholder}>
            No player {player} points to show in pie chart.
          </Text>
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
