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

  console.log(barData);

  const chartConfig = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 3,
    barPercentage: 0.8,
  };

  return (
    <>
      <Text>Error Graphs</Text>
      <View>
        <PieChart
          data={pieData}
          width={Dimensions.get("window").width * 0.85}
          height={220}
          chartConfig={chartConfig}
          accessor={"errorQty"}
          backgroundColor={"transparent"}
          // paddingLeft={"15"}
          // center={[10, 50]}
          absolute
        />
      </View>
      <View>
        <BarChart
          // style={graphStyle}
          data={barData}
          width={Dimensions.get("window").width * 0.85}
          height={220}
          chartConfig={chartConfig}
        />
      </View>
    </>
  );
};

export default ErrorGraph;

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
