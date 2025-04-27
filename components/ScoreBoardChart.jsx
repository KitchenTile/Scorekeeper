import React, { useState } from "react";
import { LineChart } from "react-native-chart-kit";
import { Dimensions, StyleSheet, Text, View } from "react-native";

const ScoreBoardChart = ({ lineChartScore }) => {
  const [selectedPoint, setSelectedPoint] = useState(null);

  return (
    <>
      <View
        style={[
          styles.pointInfoContainer,
          {
            borderColor:
              selectedPoint !== null
                ? selectedPoint.author === "opp" ||
                  selectedPoint.author.includes("opp")
                  ? "#DC605B"
                  : "#586DFF"
                : "#3A464E",
          },
        ]}
      >
        {selectedPoint ? (
          <>
            <Text style={styles.infoText}>
              Point Number: {selectedPoint.pointNumber}
            </Text>
            <Text style={styles.infoText}>
              Point By: Player {selectedPoint.author}
            </Text>
            <Text style={styles.infoText}>
              Point Method: {selectedPoint.method}
            </Text>
          </>
        ) : null}
      </View>

      {/*  chart */}
      <LineChart
        data={{
          labels: lineChartScore.map((point, index) => index),
          datasets: [{ data: lineChartScore.map((point) => point.score) }],
        }}
        width={Dimensions.get("window").width * 0.95}
        height={350}
        withShadow={false}
        withInnerLines={false}
        yAxisLabel=""
        xAxisLabel=""
        chartConfig={{
          backgroundGradientFrom: "transparent",
          backgroundGradientTo: "transparent",
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          propsForDots: { r: "4", strokeWidth: "2", stroke: "#fff" },

          propsForBackgroundLines: {
            strokeDasharray: "",
            strokeWidth: 1,
          },
        }}
        linear
        style={styles.chart}
        onDataPointClick={({ value, index }) => {
          setSelectedPoint({
            value,
            pointNumber: index,
            author: lineChartScore[index].author,
            method: lineChartScore[index].method,
          });
        }}
      />
    </>
  );
};

export default ScoreBoardChart;

const styles = StyleSheet.create({
  pointInfoContainer: {
    width: "100%",
    height: 100,
    borderWidth: 2,
    borderColor: "#3A464E",
    borderRadius: 20,
    paddingInline: 15,
    paddingBlock: 4,
    marginTop: 20,
    marginInline: "auto",
  },

  infoText: {
    color: "white",
    fontSize: 15,
    lineHeight: 30,
  },

  chart: {
    width: "90%",
    marginVertical: 10,
    borderRadius: 20,
    alignItems: "center",
    position: "absolute",
    bottom: "29%",
    left: "-0.5%",
  },

  modalBackground: {
    position: "absolute",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
});
