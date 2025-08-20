import React, { useEffect, useState } from "react";
import { useMatchStore } from "../../stores/store";
import { StyleSheet, ScrollView, View, Text, Dimensions } from "react-native";
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

  // console.log(Dimensions.get("window").width * 0.18);

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
        id: doc.id,
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
        <TouchableOpacity
          onPress={() => setCurrentMatch(!currentMatch)}
          disabled={matchList === null}
        >
          <Text style={styles.title}>
            {currentMatch ? "Current Game" : "Match History"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setCurrentMatch(!currentMatch)}
          disabled={matchList === null}
        >
          <AntDesign
            name="swap"
            size={26}
            color="white"
            style={{
              position: "relative",
              top: 3,
              left: Dimensions.get("window").width * 0.18,
            }}
          />
        </TouchableOpacity>
      </View>
      {currentMatch === true ? (
        <View>
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
        </View>
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

  text: {
    fontSize: 42,
    fontWeight: 600,
    textAlign: "center",
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
