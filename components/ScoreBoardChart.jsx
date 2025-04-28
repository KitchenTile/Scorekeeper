import React, { useState, useEffect } from "react";
import { LineChart } from "react-native-chart-kit";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import spaceMono from "../assets/fonts/SpaceMono-Regular.ttf";

const ScoreBoardChart = ({ lineChartScore, teams }) => {
  const [selectedPoint, setSelectedPoint] = useState(null);

  return (
    <>
      <View
        style={[
          styles.pointInfoContainer,
          {
            borderColor:
              selectedPoint !== null
                ? selectedPoint.type === teams[1]
                  ? "#DC605B"
                  : "#586DFF"
                : "#3A464E",
          },
        ]}
      >
        {selectedPoint ? (
          <>
            <Text
              style={[
                styles.infoText,
                { textAlign: "center", fontSize: 20, fontWeight: 600 },
              ]}
            >
              Point {selectedPoint.pointNumber} Overview
            </Text>
            <Text style={styles.infoText}>
              Point By:{" "}
              {selectedPoint.author === "none"
                ? "none"
                : `Player ${selectedPoint.author}`}
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
          labels: lineChartScore.map((point, index) =>
            index % 2 === 0 ? index : ""
          ),
          datasets: [{ data: lineChartScore.map((point) => point.score) }],
        }}
        width={Dimensions.get("window").width * 0.95}
        height={350}
        withShadow={true}
        withInnerLines={true}
        yAxisInterval={5}
        fromZero={true}
        yAxisLabel=""
        xAxisLabel=""
        chartConfig={{
          backgroundGradientFrom: "transparent",
          backgroundGradientTo: "transparent",
          decimalPlaces: 0,
          color: (opacity = 1) => {
            if (lineChartScore[lineChartScore.length - 1].score > 0) {
              return `rgba(88, 109, 255, ${opacity})`;
            } else {
              return `rgba(220, 96, 91, ${opacity})`;
            }
          },
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          propsForLabels: {
            fontFamily: "SpaceMono",
            fontWeight: 100,
          },
          propsForDots: {
            r: "5",
            strokeWidth: "2",
            stroke: "#fff",
          },
          propsForBackgroundLines: {
            strokeDasharray: "",
            strokeWidth: 1,
          },
        }}
        // linear
        bezier
        style={styles.chart}
        getDotColor={(dataPoint, dataPointIndex) => {
          if (lineChartScore[dataPointIndex].type === teams[1]) {
            return "#DC605B";
          } else {
            return "#586DFF";
          }
        }}
        onDataPointClick={({ value, index }) => {
          setSelectedPoint({
            value,
            pointNumber: index,
            author: lineChartScore[index].author,
            method: lineChartScore[index].method,
            type: lineChartScore[index].type,
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
