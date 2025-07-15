import React, { useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import PlayersGraphs from "../../components/stats_components/PlayersGraphs";
import ErrorGraph from "../../components/stats_components/ErrorGraph";
import IndividualStats from "../../components/stats_components/IndividualStats";

const SetBreakdownCard = ({
  set,
  index,
  isActive,
  onToggle,
  statView,
  onStatChange,
  pointOrError,
  onPointToggle,
  players,
  selectedPlayer,
  onSelectPlayer,
}) => {
  return (
    <View style={[styles.container, { height: isActive ? "auto" : 65 }]}>
      <View style={styles.header}>
        <Text style={styles.title}>SET {Number(index) + 1} BREAKDOWN</Text>
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
          <View style={styles.toggleRow}>
            <ToggleButton
              label="TEAM"
              active={statView === "team"}
              onPress={() => onStatChange("team")}
            />
            <ToggleButton
              label="PLAYERS"
              active={statView === "players"}
              onPress={() => onStatChange("players")}
            />
          </View>

          {statView === "team" ? (
            <>
              <View style={styles.toggleRow}>
                <ToggleButton
                  label="POINTS"
                  active={pointOrError === "points"}
                  onPress={() => onPointToggle("points")}
                />
                <ToggleButton
                  label="ERRORS"
                  active={pointOrError === "errors"}
                  onPress={() => onPointToggle("errors")}
                />
              </View>
              {pointOrError === "points" ? (
                <PlayersGraphs set={set} />
              ) : (
                <ErrorGraph set={set} />
              )}
            </>
          ) : (
            <>
              <View style={styles.toggleRow}>
                {players.map((player) => (
                  <TouchableOpacity
                    key={player}
                    style={[
                      styles.playerBtn,
                      selectedPlayer === player && styles.selected,
                    ]}
                    onPress={() => onSelectPlayer(player)}
                  >
                    <Text style={styles.playerText}>{player}</Text>
                  </TouchableOpacity>
                ))}
              </View>
              <View style={styles.toggleRow}>
                <ToggleButton
                  label="POINTS"
                  active={pointOrError === "points"}
                  onPress={() => onPointToggle("points")}
                />
                <ToggleButton
                  label="ERRORS"
                  active={pointOrError === "errors"}
                  onPress={() => onPointToggle("errors")}
                />
              </View>
              <IndividualStats
                player={selectedPlayer}
                set={set}
                pointsOrError={pointOrError}
              />
            </>
          )}
        </>
      )}
    </View>
  );
};

const ToggleButton = ({ label, active, onPress }) => (
  <TouchableOpacity
    style={[styles.toggleBtn, active && styles.activeBtn]}
    onPress={onPress}
  >
    <Text style={[styles.toggleText, active && styles.activeText]}>
      {label}
    </Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    width: "100%",
    borderWidth: 2,
    borderColor: "#3A464E",
    borderRadius: 20,
    marginTop: 20,
    paddingInline: 10,
  },
  header: {
    height: 65,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: { fontSize: 22, color: "white", fontWeight: "bold" },
  iconBtn: { padding: 5 },
  toggleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  toggleBtn: {
    flex: 1,
    borderWidth: 2,
    borderColor: "#3c4cbb",
    paddingVertical: 8,
    borderRadius: 5,
    marginHorizontal: 5,
    backgroundColor: "transparent",
  },
  activeBtn: {
    backgroundColor: "#586DFF",
  },
  toggleText: {
    color: "#586DFF",
    fontSize: 16,
    textAlign: "center",
  },
  activeText: {
    color: "white",
  },
  // playerBtn: {
  //   padding: 10,
  //   borderRadius: 5,
  //   margin: 5,
  //   borderWidth: 2,
  //   borderColor: "#3c4cbb",
  //   backgroundColor: "#586DFF",
  // },
  playerBtn: {
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
  selected: {
    backgroundColor: "#28a745",
    borderColor: "#28a745",
  },
  playerText: {
    color: "white",
    fontSize: 20,
    textAlign: "center",
  },
});

export default SetBreakdownCard;
