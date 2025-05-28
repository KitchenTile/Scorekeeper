import React from "react";
import { ScrollView, View, Text } from "react-native-web";
import { useMatchStore } from "../../store";
import { StyleSheet } from "react-native";
import { BarChart, PieChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";
import {
  playersPointsPerSetOrganizer,
  pointByMethodOrganizer,
} from "../../utils/statsProcessor";

const PlayersGraphs = ({ set }) => {
  const players = useMatchStore((state) => state.players);

  const playerObject = playersPointsPerSetOrganizer(players, set);
  const oppObject = pointByMethodOrganizer(set);

  const barData = {
    labels: Object.entries(playerObject).map(([key, value]) => {
      return key;
    }),
    datasets: [
      {
        data: Object.entries(playerObject).map(([key, value]) => {
          return value;
        }),
      },
    ],
  };

  const pieData = Object.entries(oppObject).map(([key, value], index) => {
    const hue = 205 + index * 4;
    const lightness = Math.max(30, 60 - value * 5);

    return {
      name: key,
      errorQty: value,
      color: `hsl(${hue}, 100%, ${lightness}%)`,
      legendFontColor: "#7F7F7F",
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

  const pieHasData = pieData.some((entry) => entry.errorQty > 0);
  const barHasData = barData.datasets[0].data.some((val) => val > 0);

  return (
    <>
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
            />
            <Text style={styles.placeholder}>Points per player</Text>
          </>
        ) : (
          <Text style={styles.placeholder}>
            No points data to show in bar chart.
          </Text>
        )}
      </View>
      <View>
        {pieHasData ? (
          <>
            <PieChart
              data={pieData}
              width={Dimensions.get("window").width * 0.85}
              height={220}
              chartConfig={chartConfig}
              accessor={"errorQty"}
              backgroundColor={"transparent"}
              paddingLeft={"30"}
              // center={[10, 50]}
              absolute
            />
            <Text style={styles.placeholder}>Type of point</Text>
          </>
        ) : (
          <Text style={styles.placeholder}>
            No error data to show in pie chart.
          </Text>
        )}
      </View>
    </>
  );
};

export default PlayersGraphs;

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
