import React, { useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import PlayersGraphs from "../../components/stats_components/PlayersGraphs";
import ErrorGraph from "../../components/stats_components/ErrorGraph";
import IndividualStats from "../../components/stats_components/IndividualStats";
import FilterComponent from "../misc/FilterComponent";
import { useMatchStore } from "../../stores/store";

const SetBreakdownCard = ({
  match = null,
  set,
  index,
  isActive,
  onToggle,
  statView,
  onStatChange,
  pointOrError,
  onPointToggle,
  selectedPlayer,
  onSelectPlayer,
}) => {
  const setWinner = set.scores.myScore > set.scores.oppScore;
  const players = useMatchStore((state) => state.players);
  const oppPlayers = useMatchStore((state) => state.oppPlayers);
  const teams = useMatchStore((state) => state.teams);

  return (
    <View
      style={[
        styles.container,
        { height: isActive ? "auto" : Dimensions.get("window").height * 0.073 },
      ]}
    >
      <View style={styles.header}>
        <Text style={styles.title}>SET {Number(index) + 1}</Text>
        <View style={{ flexDirection: "row", gap: 5 }}>
          <Text
            style={[
              styles.title,
              { color: setWinner ? "white" : "rgb(58, 70, 78)" },
            ]}
          >
            {set.scores.myScore}
          </Text>
          <Text style={styles.title}>-</Text>
          <Text
            style={[
              styles.title,
              { color: setWinner ? "rgb(58, 70, 78)" : "white" },
            ]}
          >
            {set.scores.oppScore}
          </Text>
        </View>

        <TouchableOpacity style={styles.iconBtn} onPress={onToggle}>
          <AntDesign
            name="caretdown"
            size={20}
            color="white"
            style={{ transform: [{ rotate: isActive ? "180deg" : "0deg" }] }}
          />
        </TouchableOpacity>
      </View>

      {isActive && (
        <>
          <FilterComponent
            pointOrError={pointOrError}
            statView={statView}
            onStatChange={onStatChange}
            onPointToggle={onPointToggle}
            players={players}
            onSelectPlayer={onSelectPlayer}
            selectedPlayer={selectedPlayer}
          />
          {statView === "team" ? (
            <View>
              {pointOrError === "points" ? (
                <PlayersGraphs set={set} players={players} team={teams[0]} />
              ) : (
                <ErrorGraph set={set} players={players} team={teams[0]} />
              )}
            </View>
          ) : (
            <IndividualStats
              player={selectedPlayer}
              sets={match}
              set={set}
              pointsOrError={pointOrError}
              team={teams[0]}
            />
          )}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    borderWidth: 2,
    borderColor: "#3A464E",
    borderRadius: 20,
    marginTop: 20,
    paddingInline: 20,
  },
  header: {
    height: 60,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: { fontSize: 22, color: "white", fontWeight: "bold" },
  iconBtn: { padding: 5 },
  toggleRow: {
    flexDirection: "row",
    // justifyContent: "space-between",
    marginVertical: 5,
  },

  activeBtn: {
    backgroundColor: "#586DFF",
  },
  toggleText: {
    color: "#586DFF",
    fontSize: 15,
    textAlign: "center",
    lineHeight: 24,
  },
  activeText: {
    color: "white",
  },
  playerBtn: {
    backgroundColor: "#586DFF",
    // padding: 10,
    margin: 5,
    marginBlock: 10,
    borderRadius: 5,
    minWidth: 47,
    minHeight: 47,
    borderStyle: "solid",
    borderWidth: 2,
    borderColor: "#3c4cbb",
  },
  selected: {
    backgroundColor: "#28a745",
    borderColor: "#28a745",
  },
  playerText: {
    color: "white",
    fontSize: 20,
    textAlign: "center",
    lineHeight: 47,
  },
});

export default SetBreakdownCard;
