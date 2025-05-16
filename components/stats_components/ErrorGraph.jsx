import React from "react";
import { ScrollView, View, Text } from "react-native-web";
import { useMatchStore } from "../../store";
import { StyleSheet } from "react-native";
import { PieChart, BarChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";

const ErrorGraph = ({ set }) => {
  const players = useMatchStore((state) => state.players);

  const errorOrganizer = (players, sets) => {
    const errorObj = {};
    MISTAKEMETHODS.forEach((e) => {
      errorObj[e] = 0;
    });

    const playersObj = {};
    players.forEach((e) => {
      playersObj[e] = 0;
    });

    for (let i = 0; i < sets.lineChartScore.length; i++) {
      if (sets.lineChartScore[i].isMistake) {
        if (MISTAKEMETHODS.includes(sets.lineChartScore[i].method)) {
          errorObj[sets.lineChartScore[i].method]++;
        }
        if (players.includes(sets.lineChartScore[i].author)) {
          playersObj[sets.lineChartScore[i].author]++;
        }
      }
    }

    return { errorObj, playersObj };
  };

  console.log(errorOrganizer(players, set));

  const pieData = Object.entries(errorOrganizer(players, set).errorObj).map(
    ([key, value], index) => {
      const hue = 1 + index * 4;
      const lightness = Math.max(10, 80 - value * 5);

      return {
        name: key,
        errorQty: value,
        color: `hsl(${hue}, 100%, ${lightness}%)`,
        legendFontColor: "#7F7F7F",
        legendFontSize: 15,
      };
    }
  );

  const barData = {
    labels: Object.entries(errorOrganizer(players, set).playersObj).map(
      ([key, value]) => {
        return key;
      }
    ),
    datasets: [
      {
        data: Object.entries(errorOrganizer(players, set).playersObj).map(
          ([key, value]) => {
            return value;
          }
        ),
      },
    ],
  };

  console.log(pieData.length);

  const chartConfig = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 3,
    barPercentage: 0.8,
  };

  const pieHasData = pieData.some((entry) => entry.errorQty > 0);
  const barHasData = barData.datasets[0].data.some((val) => val > 0);

  return (
    <>
      <Text style={styles.title}>Error Graphs</Text>

      {pieHasData ? (
        <PieChart
          data={pieData}
          width={Dimensions.get("window").width * 0.85}
          height={220}
          chartConfig={chartConfig}
          accessor={"errorQty"}
          backgroundColor={"transparent"}
          absolute
        />
      ) : (
        <Text style={styles.placeholder}>
          No error data to show in pie chart.
        </Text>
      )}

      {barHasData ? (
        <BarChart
          data={barData}
          width={Dimensions.get("window").width * 0.85}
          height={220}
          chartConfig={chartConfig}
          style={{ color: "red" }}
        />
      ) : (
        <Text style={styles.placeholder}>
          No player error data to show in bar chart.
        </Text>
      )}
    </>
  );
};

export default ErrorGraph;

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

const MISTAKEMETHODS = [
  "Communication",
  "Passing Error",
  "Serving Error",
  "Hitting Error",
  //   "undefined",
  //   "null",
  "Free ball",
  "Court Coverage",
];
