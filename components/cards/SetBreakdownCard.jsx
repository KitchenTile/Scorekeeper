import React, { useEffect, useState } from "react";
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
import DisplayToggle from "../misc/DisplayToggle";

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
  players,
  oppPlayers,
  teams,
}) => {
  const setWinner = set.scores.myScore > set.scores.oppScore;
  const [selectedTeam, setSelectedTeam] = useState(teams[0]);

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
          <View
            style={{
              width: "100%",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <DisplayToggle
              label={teams[0]}
              active={selectedTeam === teams[0]}
              onPress={() => setSelectedTeam(teams[0])}
            />
            <DisplayToggle
              label={teams[1]}
              active={selectedTeam === teams[1]}
              onPress={() => setSelectedTeam(teams[1])}
            />
          </View>
          <FilterComponent
            pointOrError={pointOrError}
            statView={statView}
            onStatChange={onStatChange}
            onPointToggle={onPointToggle}
            players={selectedTeam === teams[0] ? players : oppPlayers}
            onSelectPlayer={onSelectPlayer}
            selectedPlayer={selectedPlayer}
          />
          {statView === "team" ? (
            <View>
              {pointOrError === "points" ? (
                <PlayersGraphs
                  set={set}
                  players={selectedTeam === teams[0] ? players : oppPlayers}
                  team={selectedTeam === teams[0] ? teams[0] : teams[1]}
                />
              ) : (
                <ErrorGraph
                  set={set}
                  players={selectedTeam === teams[0] ? players : oppPlayers}
                  team={selectedTeam === teams[0] ? teams[0] : teams[1]}
                />
              )}
            </View>
          ) : (
            <IndividualStats
              player={selectedPlayer}
              sets={match}
              set={set}
              pointsOrError={pointOrError}
              team={selectedTeam === teams[0] ? teams[0] : teams[1]}
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
