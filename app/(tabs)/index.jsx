import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Modal,
  TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";
import { ThemedText } from "@/components/ThemedText";
import ScoreBoardChart from "../../components/ScoreBoardChart";
import StatsComponent from "../../components/StatsComponent";
import PointScoreModal from "../../components/PointScoreModal";
import { SafeAreaView } from "react-native-safe-area-context";
import SetPlayersModal from "../../components/SetPlayersModal";

const app = () => {
  const [players, setPlayers] = useState([]);
  const [scores, setScores] = useState({
    score: 0,
    myScore: 0,
    oppScore: 0,
  });
  const [modalVisible, setModalVisible] = useState({
    setScore: false,
    setPlayers: true,
  });
  const [lineChartScore, setLineChartScore] = useState([
    { score: 0, author: "none", method: "No Points Yet" },
  ]);
  const [currentPoint, setCurrentPoint] = useState({
    author: null,
    method: null,
    type: null,
  });

  useEffect(() => {
    console.log(lineChartScore);
  }, [lineChartScore]);

  useEffect(() => {
    console.log(scores);
  }, [scores]);

  const handlePlayerSubmit = (value) => {
    setPlayers((prev) => {
      if (!prev.includes(value)) {
        return [...prev, value];
      }
      return prev;
    });
  };

  const handlePlayerDelete = (value) => {
    setPlayers((prev) => {
      return prev.filter((id) => id !== prev[value]);
    });
  };

  const handleConfirm = () => {
    if (currentPoint.type === "myScore")
      setScores({
        ...scores,
        myScore: scores.myScore + 1,
        score: scores.score + 1,
      });
    else
      setScores({
        ...scores,
        oppScore: scores.oppScore + 1,
        score: scores.score - 1,
      });

    setLineChartScore((prev) => [
      ...prev,
      {
        score:
          currentPoint.type === "myScore" ? scores.score + 1 : scores.score - 1,
        author: currentPoint.author,
        method: currentPoint.method,
      },
    ]);

    setModalVisible({ ...modalVisible, setScore: false });
    setCurrentPoint({ author: null, method: null, type: null });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <SetPlayersModal
        modalVisible={modalVisible.setPlayers}
        players={players}
        handlePlayerDelete={handlePlayerDelete}
        handlePlayerSubmit={handlePlayerSubmit}
        onConfirm={() =>
          players.length >= 6
            ? setModalVisible({ ...modalVisible, setPlayers: false })
            : console.log("not enough players")
        }
      />
      <ThemedText lightColor="true" type="default" style={styles.title}>
        Ruben's Score Tracker App
      </ThemedText>

      <ScoreBoardChart lineChartScore={lineChartScore} />

      <SafeAreaView style={styles.infoContainer}>
        <StatsComponent
          team={"MY TEAM"}
          score={scores.myScore}
          scoreDetails={lineChartScore}
        />
        <StatsComponent
          team={"OPPONENT"}
          score={scores.oppScore}
          scoreDetails={lineChartScore}
        />
      </SafeAreaView>
      <SafeAreaView style={styles.bttnsContainer}>
        <TouchableOpacity
          style={styles.bttn}
          onPress={() => {
            setCurrentPoint({ ...currentPoint, type: "myScore" });
            setModalVisible({ ...modalVisible, setScore: true });
          }}
        >
          <Text style={styles.bttnTxt}>+</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.bttnOpp}>
          <Text
            style={styles.bttnTxt}
            onPress={() => {
              setCurrentPoint({ ...currentPoint, type: "oppScore" });
              setModalVisible({ ...modalVisible, setScore: true });
            }}
          >
            -
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
      <PointScoreModal
        modalVisible={modalVisible.setScore}
        players={players}
        currentPoint={currentPoint}
        setCurrentPoint={setCurrentPoint}
        onConfirm={handleConfirm}
        onClose={() => {
          setModalVisible({ ...modalVisible, setScore: false });
          setCurrentPoint({ author: null, method: null, type: null });
        }}
      />
    </ScrollView>
  );
};

export default app;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#161F23",
    flex: 1,
    flexDirection: "column",
    marginTop: 50,
    // maxWidth: "800px",
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },

  infoContainer: {
    width: "90%",
    height: 170,
    position: "absolute",
    bottom: "12.5%",
    left: "5%",
    border: "2px solid #3A464E",
    borderRadius: 20,
    overflow: "hidden",
    marginInline: "auto",
    flexDirection: "row",
    justifyContent: "space-between",
  },

  bttnsContainer: {
    position: "absolute",
    bottom: "3%",
    width: "90%",
    left: "5%",
    flexDirection: "row",
    justifyContent: "space-between",
    height: 40,
    marginBlock: 20,
  },

  bttn: {
    width: 177,
    height: 65,
    backgroundColor: "#78C93C",
    border: "2px solid #488719",
    position: "relative",
    paddingBlock: 10,
    paddingInline: 20,
    borderRadius: 20,
  },

  bttnOpp: {
    width: 177,
    height: 65,
    backgroundColor: "#DC605B",
    border: "2px solid #B52924",
    position: "relative",
    paddingBlock: 10,
    paddingInline: 20,
    borderRadius: 20,
  },

  bttnTxt: {
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -60%)",
    fontSize: "34px",
    lineHeight: "28px",
    textAlign: "center",
    color: "rgb(0,0,0)",
    fontWeight: 600,
  },

  text: {
    fontSize: 42,
    fontWeight: 600,
    textAlign: "center",
  },

  //
});
