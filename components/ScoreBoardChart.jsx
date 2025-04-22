import React, { useState } from "react";
import { LineChart } from "react-native-chart-kit";
import { Dimensions, StyleSheet, Text, View } from "react-native";

const ScoreBoardChart = ({ lineChartScore }) => {
  const [selectedPoint, setSelectedPoint] = useState(null);

  return (
    <>
      {selectedPoint && (
        <View style={styles.pointInfoContainer}>
          <Text style={styles.infoText}>
            Point Number: {selectedPoint.pointNumber}
          </Text>
          <Text style={styles.infoText}>
            Point By: Player {selectedPoint.author}
          </Text>
          <Text style={styles.infoText}>
            Point Method: {selectedPoint.method}
          </Text>
        </View>
      )}

      <LineChart
        data={{
          labels: lineChartScore.map((point, index) => index),
          datasets: [{ data: lineChartScore.map((point) => point.score) }],
        }}
        width={Dimensions.get("window").width * 0.9}
        height={320}
        withShadow={false}
        withInnerLines={false}
        yAxisLabel=""
        xAxisLabel=""
        chartConfig={{
          backgroundGradientFrom: "#3A464E",
          backgroundGradientTo: "#3A464E",
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          propsForDots: { r: "4", strokeWidth: "2", stroke: "#fff" },
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
    width: "90%",
    height: 110,
    marginInline: "auto",
    marginTop: 30,
    padding: 10,
    backgroundColor: "#161F23",
    border: "2px solid #3A464E",
    borderRadius: 10,
  },

  infoText: {
    color: "white",
    fontSize: 16,
    lineHeight: 30,
  },

  chart: {
    width: "90%",
    backgroundColor: "#161F23",
    marginVertical: 10,
    borderRadius: 20,
    alignItems: "center",
    position: "absolute",
    bottom: "34.5%",
    left: "5%",
  },

  modalBackground: {
    position: "absolute",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
});
