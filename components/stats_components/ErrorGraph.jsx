import React from "react";
import { ScrollView, View, Text } from "react-native-web";
import { useMatchStore } from "../../stores/store";
import { StyleSheet } from "react-native";
import { PieChart, BarChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";
import { errorOrganizer } from "../../utils/statsProcessor";

const ErrorGraph = ({ set }) => {
  const players = useMatchStore((state) => state.players);

  const pieData = Object.entries(errorOrganizer(players, set).errorObj).map(
    ([key, value], index) => {
      const hue = 1 + index * 4;
      const lightness = Math.max(10, 80 - value * 5);

      return {
        name: key,
        errorQty: value,
        color: `hsl(${hue}, 100%, ${lightness}%)`,
        legendFontColor: "rgb(204, 204, 204)",
        legendFontSize: 14,
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

  const chartConfig = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgb(253, 98, 95)`,
    labelColor: () => "rgb(204, 204, 204)",
    strokeWidth: 3,
    barPercentage: 0.8,

    backgroundGradientFrom: "#f7f7f7",
    backgroundGradientTo: "#e3e3e3",
  };

  const pieHasData = pieData.some((entry) => entry.errorQty > 0);
  const barHasData = barData.datasets[0].data.some((val) => val > 0);

  return (
    <>
      <Text style={styles.title}>Error Graphs</Text>

      <View
        style={{
          borderRadius: 12,
          boxShadow: "rgb(22 22 22) 0px 4px 15px 2px",
          marginBottom: 15,
        }}
      >
        {barHasData ? (
          <>
            <BarChart
              data={barData}
              width={Dimensions.get("window").width * 0.85}
              height={220}
              showValuesOnTopOfBars
              chartConfig={{
                backgroundGradientFrom: "transparent",
                backgroundGradientTo: "transparent",
                decimalPlaces: 0,
                color: (opacity = 1) => `rgb(253, 98, 95)`,
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
            />
            <Text style={styles.placeholder}>Error per player</Text>
          </>
        ) : (
          <Text style={styles.placeholder}>
            No player error data to show in bar chart.
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

      <View
        style={{
          borderRadius: 12,
          boxShadow: "rgb(22 22 22) 0px 4px 15px 2px",
          marginBottom: 15,
        }}
      >
        {pieHasData ? (
          <>
            <PieChart
              data={pieData}
              width={Dimensions.get("window").width * 0.8}
              height={220}
              center={[10, 0]}
              chartConfig={chartConfig}
              accessor={"errorQty"}
              backgroundColor={"transparent"}
              absolute
              style={{
                "font-family": "Roboto, Helvetica, Arial, sans-serif",
              }}
            />
            <Text style={styles.placeholder}>Type of Error</Text>
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

export default ErrorGraph;

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
