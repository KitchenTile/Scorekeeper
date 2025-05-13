import React from "react";
import { ScrollView, View, Text } from "react-native-web";
import { useMatchStore } from "../../store";
import { StyleSheet } from "react-native";
import { BarChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";

const PlayersGraphs = () => {
  const sets = useMatchStore((state) => state.sets);
  const players = useMatchStore((state) => state.players);

  const data = {
    labels: players,
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43],
      },
    ],
  };

  const chartConfig = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false, // optional
  };

  return (
    <View>
      <BarChart
        // style={graphStyle}
        data={data}
        width={Dimensions.get("window").width * 0.95}
        height={220}
        yAxisLabel="$"
        chartConfig={chartConfig}
        verticalLabelRotation={30}
      />
    </View>
  );
};

export default PlayersGraphs;
