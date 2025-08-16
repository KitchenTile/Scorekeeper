import React, { useEffect, useState } from "react";
import { useMatchStore } from "../../stores/store";
import { StyleSheet, ScrollView, View, Text } from "react-native";
import { TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import TeamsCompoenent from "@/components/court_components/TeamsComponent";
import { db, auth } from "@/firebase";
import {
  collection,
  getDocs,
  doc,
  getDoc,
  query,
  where,
} from "firebase/firestore";
import MatchHistryCards from "../../components/cards/MatchHistryCards";
import SetBreakdownCard from "../../components/cards/SetBreakdownCard";
import PrevMatchModal from "../../components/stats_components/PrevMatchModal";

const stats = () => {
  const sets = useMatchStore((state) => state.sets);
  const matchWinner = useMatchStore((state) => state.matchWinner);
  const players = useMatchStore((state) => state.players);
  const [activeTab, setActiveTab] = useState(sets.length - 1);
  const [statView, setStatView] = useState("team");
  const [pointOrError, setPointOrError] = useState("points");
  const [selectedPlayer, setSelectedPlayer] = useState(players[0]);
  const [currentMatch, setCurrentMatch] = useState(true);
  const [matchList, setMatchList] = useState(null);

  const [selectedMatchId, setSelectedMatchId] = useState(null);
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [prevMatchModalVisible, setPrevMatchModalVisible] = useState(false);

  useEffect(() => {
    const fetchMatches = async () => {
      // const res = await getDocs(collection(db, "match_history"));
      const res = await getDocs(
        query(
          collection(db, "match_history"),
          where("user_id", "==", auth.currentUser.uid)
        )
      );
      const matches = res.docs.map((doc) => ({
        ...doc.data(),
      }));
      setMatchList(
        matches
          // .filter((x) => x.user_id === auth.currentUser.uid)
          .sort((a, b) => new Date(b.time_created) - new Date(a.time_created))
      );

      // console.log(matches);
    };

    fetchMatches();
  }, [matchWinner]);

  useEffect(() => {
    console.log("Match List");
    console.log(matchList);
  }, [matchList]);

  useEffect(() => {
    const fetchMatch = async () => {
      if (selectedMatchId) {
        const res = await getDoc(doc(db, "match_history", selectedMatchId));
        if (res.exists()) {
          setSelectedMatch(res.data());
          setCurrentMatch(false);
          setPrevMatchModalVisible(true);
        }
      }
    };

    fetchMatch();
  }, [selectedMatchId]);

  const activeTabToggle = (index) => {
    setActiveTab((prev) => {
      if (prev === index) {
        return null;
      } else {
        return index;
      }
    });
  };

  const activeStatToggle = (e) => {
    setStatView((prev) => {
      if (prev === e) {
        return prev;
      } else {
        return e;
      }
    });
  };

  const pointOrErrorToggle = (e) => {
    setPointOrError((prev) => {
      if (prev === e) {
        return prev;
      } else {
        return e;
      }
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.screenToggle}>
        <TouchableOpacity onPress={() => setCurrentMatch(!currentMatch)}>
          <Text style={styles.title}>
            {currentMatch ? "Current Game" : "Match History"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setCurrentMatch(!currentMatch)}>
          <AntDesign
            name="swap"
            size={26}
            color="white"
            style={{ position: "relative", top: 3, left: 75 }}
          />
        </TouchableOpacity>
      </View>
      {currentMatch === true ? (
        <ScrollView>
          <TeamsCompoenent />

          {sets.map((set, index) => (
            <SetBreakdownCard
              match={sets}
              set={set}
              key={index}
              index={index}
              isActive={activeTab === index}
              onToggle={() => {
                activeTabToggle(index);
                activeStatToggle("team");
              }}
              statView={statView}
              onStatChange={activeStatToggle}
              pointOrError={pointOrError}
              onPointToggle={pointOrErrorToggle}
              players={players}
              selectedPlayer={selectedPlayer}
              onSelectPlayer={setSelectedPlayer}
            />
          ))}
        </ScrollView>
      ) : (
        <ScrollView>
          {matchList.length !== 0 ? (
            matchList.map((match, index) => (
              <MatchHistryCards
                key={index}
                match={match}
                setSelectedMatchId={setSelectedMatchId}
              />
            ))
          ) : (
            <Text style={[styles.title, { width: "100%", marginTop: 10 }]}>
              No matches to show
            </Text>
          )}
          {selectedMatch !== null ? (
            <PrevMatchModal
              isVisible={prevMatchModalVisible}
              setIsVisible={setPrevMatchModalVisible}
              setSelectedMatchId={setSelectedMatchId}
              match={selectedMatch}
            />
          ) : null}
        </ScrollView>
      )}
    </ScrollView>
  );
};

export default stats;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#161F23",
    flex: 1,
    flexDirection: "column",
    marginTop: 50,
    padding: 20,
    height: "100%",
    overflow: "scroll",
  },

  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    color: "white",
    width: 150,
  },

  pointInfoContainer: {
    width: "100%",
    height: 80,
    borderWidth: 2,
    borderColor: "#3A464E",
    borderRadius: 20,
    marginTop: 20,
    padding: 10,
    marginInline: "auto",
    overflow: "hidden",
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
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    textAlign: "center",
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
    fontSize: 22,
    textAlign: "center",
    color: "white",
    lineHeight: 35,
  },

  smallOptionButton: {
    backgroundColor: "#586DFF",
    padding: 3,
    paddingTop: 0,
    margin: 5,
    borderRadius: 5,
    minWidth: 30,
    maxHeight: 30,
    borderStyle: "solid",
    borderWidth: 2,
    borderColor: "#3c4cbb",
  },

  optionButton: {
    backgroundColor: "#586DFF",
    padding: 3,
    paddingTop: 0,
    marginBottom: 15,
    borderRadius: 5,
    minWidth: "48%",
    minHeight: 40,
    borderStyle: "solid",
    borderWidth: 2,
    borderColor: "#3c4cbb",
  },

  playersButton: {
    backgroundColor: "#586DFF",
    padding: 10,
    margin: 5,
    marginBlock: 10,
    borderRadius: 5,
    minWidth: 51,
    minHeight: 51,
    borderStyle: "solid",
    borderWidth: 2,
    borderColor: "#3c4cbb",
  },

  text: {
    fontSize: 42,
    fontWeight: 600,
    textAlign: "center",
  },

  optionText: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    fontSize: 22,
    color: "white",
  },

  optionContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    width: "100%",
  },

  selectedOption: {
    backgroundColor: "#28a745",
    borderColor: "#28a745",
    borderStyle: "solid",
    borderWidth: 2,
  },

  screenToggle: {
    borderWidth: 2,
    borderColor: "#3A464E",
    borderStyle: "solid",
    borderRadius: 20,
    padding: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 62,
    // gap: 90,
  },
});
