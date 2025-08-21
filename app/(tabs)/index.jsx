import {
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  View,
  Dimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
import ScoreBoardChart from "../../components/court_components/ScoreBoardChart";
import StatsComponent from "../../components/court_components/StatsComponent";
import PointScoreModal from "../../components/court_components/PointScoreModal";
import { SafeAreaView } from "react-native-safe-area-context";
import SetPlayersModal from "../../components/court_components/SetPlayersModal";
import FinishedMatchModal from "../../components/misc/FinishedMatchModal";
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

    console.log(JSON.stringify(getSets(), null, 2));

    const submit = async () => {
      try {
        await addDoc(collection(db, "match_history"), getSets());
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
          <SafeAreaView
            style={[
              styles.infoContainer,
              { height: Dimensions.get("window").height * 0.191 },
            ]}
          >
            <View style={styles.line} />
            <TouchableOpacity
              style={[
                styles.infoIcon,
                { height: Dimensions.get("window").height * 0.03375 },
              ]}
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
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  width: "100%",
                  position: "absolute",
                  top: "15%",
                }}
              >
                <StatsComponent
                  team={teams[0]}
                  score={currentSet.scores.myScore}
                />
                <StatsComponent
                  team={teams[1]}
                  score={currentSet.scores.oppScore}
                />
              </View>
            )}
          </SafeAreaView>
          <SafeAreaView
            style={[
              styles.bttnsContainer,
              { height: Dimensions.get("window").height * 0.04 },
            ]}
          >
            <TouchableOpacity
              style={[
                styles.bttn,
                { height: Dimensions.get("window").height * 0.062 },
              ]}
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
                {
                  backgroundColor: "#DC605B",
                  borderColor: "#B52924",
                  height: Dimensions.get("window").height * 0.062,
                },
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
          <FinishedMatchModal />
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
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },

  infoContainer: {
    width: "100%",
    position: "absolute",
    bottom: "11.5%",
    left: "5%",
    borderWidth: 2,
    borderColor: "#3A464E",
    borderRadius: 20,
    // backgroundColor: "red",
    marginInline: "auto",
    flexDirection: "row",
    justifyContent: "space-between",
  },

  bttnsContainer: {
    position: "absolute",
    bottom: "8%",
    width: "100%",
    left: "5%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBlock: 20,
  },

  bttn: {
    width: "48.5%",
    backgroundColor: "#78C93C",
    borderWidth: 2,
    borderColor: "#488719",
    position: "relative",
    paddingBlock: 10,
    paddingInline: 20,
    borderRadius: 15,
  },

  bttnTxt: {
    fontSize: 30,
    lineHeight: 34,
    textAlign: "center",
    color: "rgb(0, 0, 0)",
    fontWeight: 600,
  },

  line: {
    height: "90%",
    width: 2,
    backgroundColor: "rgba(58,70,78,1.00)",
    position: "absolute",
    top: 0,
    left: "50%",
    top: "50%",
    transform: "translateY(-50%)",
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
    // height: 30,
    backgroundColor: "#161F23",
    borderStyle: "solid",
    borderWidth: 2,
    borderColor: "#3A464E",
    zIndex: 10,
  },
});
