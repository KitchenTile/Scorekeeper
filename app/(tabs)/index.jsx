import { Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import ScoreBoardChart from "../../components/court_components/ScoreBoardChart";
import StatsComponent from "../../components/court_components/StatsComponent";
import PointScoreModal from "../../components/court_components/PointScoreModal";
import { SafeAreaView } from "react-native-safe-area-context";
import SetPlayersModal from "../../components/court_components/SetPlayersModal";
import TeamsCompoenent from "@/components/court_components/TeamsComponent";
import InfoComponent from "../../components/court_components/InfoComponent";

const app = () => {
  const [players, setPlayers] = useState([]);
  const [currentSetIndex, setCurrentSetIndex] = useState(0);
  const [infoVisible, setInfoVisible] = useState(false);
  const [teams, setTeams] = useState(["", ""]);
  const [modalVisible, setModalVisible] = useState({
    setScore: false,
    setPlayers: true,
  });
  const [currentPoint, setCurrentPoint] = useState({
    reason: null,
    author: null,
    method: null,
    type: null,
    isMistake: null,
  });
  const [sets, setSets] = useState([
    {
      lineChartScore: [
        {
          score: 0,
          author: "none",
          method: "No Points Yet",
          type: null,
          reason: null,
          isMistake: null,
        },
      ],
      scores: { score: 0, myScore: 0, oppScore: 0 },
      winner: "",
      number: currentSetIndex + 1,
    },
  ]);

  const currentSet = sets[currentSetIndex];

  useEffect(() => {
    console.log(sets);
  }, [sets]);

  useEffect(() => {
    console.log("My score: " + currentSet.scores.myScore);
    console.log("Opp score: " + currentSet.scores.oppScore);
    console.log("score: " + currentSet.scores.score);
  }, [currentSet.scores]);

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
    if (
      (currentPoint.type === `${teams[0]}` &&
        currentSet.scores.myScore >= 4 &&
        currentSet.scores.score >= 1) ||
      (currentPoint.type === `${teams[1]}` &&
        currentSet.scores.oppScore >= 4 &&
        currentSet.scores.score <= -1)
    ) {
      setSets((prev) => {
        const updatedSets = [...prev];
        updatedSets[currentSetIndex] = {
          ...updatedSets[currentSetIndex],
          winner:
            currentPoint.type === `${teams[0]}` ? `${teams[0]}` : `${teams[1]}`,
        };

        return [
          ...updatedSets,
          {
            lineChartScore: [
              {
                score: 0,
                author: "none",
                method: "No Points Yet",
                type: null,
                reason: null,
                isMistake: null,
              },
            ],
            scores: { score: 0, myScore: 0, oppScore: 0 },
            winner: "",
            number: currentSetIndex + 2,
          },
        ];
      });
      setCurrentSetIndex((prev) => prev + 1);
    }

    setSets((prev) => {
      const updatedSets = [...prev];
      updatedSets[currentSetIndex] = {
        ...updatedSets[currentSetIndex],
        lineChartScore: [
          ...updatedSets[currentSetIndex].lineChartScore,
          {
            score:
              currentPoint.type === `${teams[0]}`
                ? updatedSets[currentSetIndex].scores.score + 1
                : updatedSets[currentSetIndex].scores.score - 1,
            author: currentPoint.author,
            method: currentPoint.method,
            type: currentPoint.type,
            reason: currentPoint.reason,
            isMistake: currentPoint.reason === "Defence Mistake",
          },
        ],
        scores: {
          myScore:
            currentPoint.type === `${teams[0]}`
              ? updatedSets[currentSetIndex].scores.myScore + 1
              : updatedSets[currentSetIndex].scores.myScore,
          oppScore:
            currentPoint.type === `${teams[0]}`
              ? updatedSets[currentSetIndex].scores.oppScore
              : updatedSets[currentSetIndex].scores.oppScore + 1,
          score:
            currentPoint.type === `${teams[0]}`
              ? updatedSets[currentSetIndex].scores.score + 1
              : updatedSets[currentSetIndex].scores.score - 1,
        },
      };
      return updatedSets;
    });

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

      <ScoreBoardChart
        lineChartScore={currentSet.lineChartScore}
        teams={teams}
      />

      <SafeAreaView style={styles.infoContainer}>
        <TouchableOpacity
          style={styles.infoIcon}
          onPress={() => setInfoVisible(!infoVisible)}
        >
          <Text style={{ color: "white", textAlign: "center", lineHeight: 26 }}>
            ?
          </Text>
        </TouchableOpacity>
        {infoVisible ? (
          <InfoComponent />
        ) : (
          <>
            <StatsComponent
              team={teams[0]}
              score={currentSet.scores.myScore}
              scoreDetails={currentSet.lineChartScore}
            />
            <StatsComponent
              team={teams[1]}
              score={currentSet.scores.oppScore}
              scoreDetails={currentSet.lineChartScore}
            />
          </>
        )}
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
    // overflow: "hidden",
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
    width: "48.5%",
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
    width: "48.5%",
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

  infoIcon: {
    position: "absolute",
    top: "-5%",
    left: "95%",
    borderRadius: "100%",
    width: 30,
    height: 30,
    backgroundColor: "#161F23",
    borderStyle: "solid",
    borderWidth: 2,
    borderColor: "#3A464E",
    zIndex: 10,
  },
});
