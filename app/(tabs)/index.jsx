import { Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import ScoreBoardChart from "../../components/court_components/ScoreBoardChart";
import StatsComponent from "../../components/court_components/StatsComponent";
import PointScoreModal from "../../components/court_components/PointScoreModal";
import { SafeAreaView } from "react-native-safe-area-context";
import SetPlayersModal from "../../components/court_components/SetPlayersModal";
import TeamsCompoenent from "@/components/court_components/TeamsComponent";
import InfoComponent from "../../components/court_components/InfoComponent";
import LoginScreen from "@/components/misc/LoginScreen";
import { collection, addDoc } from "firebase/firestore";
import { useAuthStore, useMatchStore } from "../../stores/store";
import { db, auth } from "@/firebase";

const app = () => {
  const sets = useMatchStore((state) => state.sets);
  const setModalVisible = useMatchStore((state) => state.setModalVisible);
  const players = useMatchStore((state) => state.players);
  const modalVisible = useMatchStore((state) => state.modalVisible);
  const teams = useMatchStore((state) => state.teams);
  const currentPoint = useMatchStore((state) => state.currentPoint);
  const setCurrentPoint = useMatchStore((state) => state.setCurrentPoint);
  const currentSetIndex = useMatchStore((state) => state.currentSetIndex);
  const matchWinner = useMatchStore((state) => state.matchWinner);

  const [infoVisible, setInfoVisible] = useState(false);
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  const currentSet = sets[currentSetIndex];

  console.log(sets);

  useEffect(() => {
    const getSets = () => {
      const gameSets = Object.fromEntries(sets.map((set, i) => [i, set]));

      return {
        gameSets: { ...gameSets },
        teams: teams,
        time_created: Date.now(),
        user_id: isLoggedIn ? auth.currentUser.uid : "No User ID",
        match_winner: matchWinner,
        players: players,
      };
    };

    const submit = async () => {
      try {
        await addDoc(collection(db, "match_history"), getSets());
        console.log("submitted");
      } catch (error) {
        console.log(error);
      }
    };

    if (matchWinner !== null) {
      submit();
    }
  }, [matchWinner]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {isLoggedIn ? (
        <>
          <SetPlayersModal />
          <TeamsCompoenent />
          <ScoreBoardChart />
          <SafeAreaView style={styles.infoContainer}>
            <TouchableOpacity
              style={styles.infoIcon}
              onPress={() => setInfoVisible(!infoVisible)}
            >
              <Text
                style={{ color: "white", textAlign: "center", lineHeight: 26 }}
              >
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
                />
                <StatsComponent
                  team={teams[1]}
                  score={currentSet.scores.oppScore}
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
              style={[
                styles.bttn,
                { backgroundColor: "#DC605B", borderColor: "#B52924" },
              ]}
              onPress={() => {
                setCurrentPoint({ ...currentPoint, type: `${teams[1]}` });
                setModalVisible({ ...modalVisible, setScore: true });
              }}
            >
              <Text style={styles.bttnTxt}>-</Text>
            </TouchableOpacity>
          </SafeAreaView>
          <PointScoreModal />
        </>
      ) : (
        <LoginScreen />
      )}
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
