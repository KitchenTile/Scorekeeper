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
import ScoreBoardChart from "../../components/ScoreBoardChart";
import StatsComponent from "../../components/StatsComponent";
import PointScoreModal from "../../components/PointScoreModal";
import { SafeAreaView } from "react-native-safe-area-context";
import SetPlayersModal from "../../components/SetPlayersModal";
import TeamsCompoenent from "@/components/TeamsComponent";

const app = () => {
  const [players, setPlayers] = useState([]);
  const [teams, setTeams] = useState(["", ""]);
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
    {
      score: 0,
      author: "none",
      method: "No Points Yet",
      type: null,
      reason: null,
    },
  ]);
  const [currentPoint, setCurrentPoint] = useState({
    reason: null,
    author: null,
    method: null,
    type: null,
  });

  useEffect(() => {
    console.log(players);
  }, [players]);

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
    if (currentPoint.type === `${teams[0]}`)
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
          currentPoint.type === `${teams[0]}`
            ? scores.score + 1
            : scores.score - 1,
        author: currentPoint.author,
        method: currentPoint.method,
        type: currentPoint.type,
        reason: currentPoint.reason,
      },
    ]);

    setModalVisible({ ...modalVisible, setScore: false });
    setCurrentPoint({ author: null, method: null, type: null });
  };

  const handleTeamSubmit = (input, idx) => {
    const updatedTeams = [...teams];
    updatedTeams[idx] = input.toUpperCase();
    setTeams(updatedTeams);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <SetPlayersModal
        modalVisible={modalVisible.setPlayers}
        players={players}
        handleTeamSubmit={handleTeamSubmit}
        handlePlayerDelete={handlePlayerDelete}
        handlePlayerSubmit={handlePlayerSubmit}
        teams={teams}
        onConfirm={() =>
          setModalVisible({ ...modalVisible, setPlayers: false })
        }
      />
      <TeamsCompoenent handleTeamSubmit={handleTeamSubmit} teams={teams} />

      <ScoreBoardChart lineChartScore={lineChartScore} teams={teams} />

      <SafeAreaView style={styles.infoContainer}>
        <StatsComponent
          team={teams[0]}
          score={scores.myScore}
          scoreDetails={lineChartScore}
        />
        <StatsComponent
          team={teams[1]}
          score={scores.oppScore}
          scoreDetails={lineChartScore}
        />
      </SafeAreaView>
      <SafeAreaView style={styles.bttnsContainer}>
        <TouchableOpacity
          style={styles.bttn}
          onPress={() => {
            setCurrentPoint({ ...currentPoint, type: `${teams[0]}` });
            setModalVisible({ ...modalVisible, setScore: true });
          }}
        >
          <Text style={styles.bttnTxt}>+</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.bttnOpp}
          onPress={() => {
            setCurrentPoint({ ...currentPoint, type: `${teams[1]}` });
            setModalVisible({ ...modalVisible, setScore: true });
          }}
        >
          <Text style={styles.bttnTxt}>-</Text>
        </TouchableOpacity>
      </SafeAreaView>
      <PointScoreModal
        modalVisible={modalVisible.setScore}
        players={players}
        currentPoint={currentPoint}
        setCurrentPoint={setCurrentPoint}
        onConfirm={handleConfirm}
        teams={teams}
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
    padding: 20,
    // maxWidth: "800px",
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },

  pointInfoContainer: {
    width: "100%",
    height: 100,
    borderWidth: 2,
    borderColor: "#3A464E",
    borderRadius: 20,
    marginTop: 20,
    marginInline: "auto",
  },

  infoContainer: {
    width: "90%",
    height: 170,
    position: "absolute",
    bottom: "12.5%",
    left: "5%",
    borderWidth: 2,
    borderColor: "#3A464E",
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
    width: 187,
    height: 65,
    backgroundColor: "#78C93C",
    borderWidth: 2,
    borderColor: "#488719",
    position: "relative",
    paddingBlock: 10,
    paddingInline: 20,
    borderRadius: 15,
  },

  bttnOpp: {
    width: 187,
    height: 65,
    backgroundColor: "#DC605B",
    borderWidth: 2,
    borderColor: "#B52924",
    position: "relative",
    paddingBlock: 10,
    paddingInline: 20,
    borderRadius: 15,
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
