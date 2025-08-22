import React, { useState, useEffect } from "react";
import { LineChart } from "react-native-chart-kit";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useMatchStore } from "@/stores/store";

const ScoreBoardChart = () => {
  const [selectedPoint, setSelectedPoint] = useState(null);
  const teams = useMatchStore((state) => state.teams);
  const sets = useMatchStore((state) => state.sets);
  const currentSetIndex = useMatchStore((state) => state.currentSetIndex);

  const lineChartScore = sets[currentSetIndex].lineChartScore;

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
            // transitionTimingFunction: "ease-in-out",
            // transitionDuration: "0.2s",
          },
        ]}
      >
        {selectedPoint ? (
          <>
            <TouchableOpacity style={styles.editButton}>
              <Text style={styles.buttonText}>Edit</Text>
            </TouchableOpacity>
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
              {selectedPoint.author === "opp"
                ? teams[1]
                : `Player ${selectedPoint.author}`}
            </Text>
            <Text style={styles.infoText}>
              Point Method:{" "}
              {selectedPoint.reason === "Defence Mistake"
                ? selectedPoint.method === null
                  ? "Defence Mistake"
                  : `Defence Mistake (${selectedPoint.method})`
                : selectedPoint.method}
            </Text>
          </>
        ) : null}
      </View>

      {/*  chart */}
      <LineChart
        data={{
          labels: lineChartScore.map((point, index) =>
            index > 10 ? (index % 2 === 0 ? index : "") : index
          ),
          datasets: [{ data: lineChartScore.map((point) => point.score) }],
        }}
        width={Dimensions.get("window").width * 0.95}
        // height={350}
        height={Dimensions.get("window").height * 0.395}
        withShadow={true}
        withInnerLines={true}
        yAxisInterval={5}
        fromZero={true}
        yAxisLabel=""
        xAxisLabel=""
        chartConfig={{
          backgroundGradientFrom: "rgba(0, 0, 0, 0)",
          backgroundGradientFromOpacity: 0,
          backgroundGradientTo: "rgba(0, 0, 0, 0)",
          backgroundGradientToOpacity: 0,
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
        linear
        // bezier
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
            reason: lineChartScore[index].reason,
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

  editButton: {
    position: "absolute",
    right: 0,
    borderWidth: 2,
    borderColor: "#3A464E",
    borderRadius: 10,
    backgroundColor: "#161F23",
    borderStyle: "solid",
  },

  buttonText: {
    color: "white",
    fontSize: 10,
    // lineHeight: 30,
  },

  chart: {
    width: "90%",
    marginVertical: 10,
    borderRadius: 20,
    alignItems: "center",
    position: "absolute",
    bottom: "29%",
    left: "2%",
  },

  modalBackground: {
    position: "absolute",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
});
