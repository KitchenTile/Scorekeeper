import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import ButtonRow from "./ButtonRow";

const FilterComponent = ({
  onStatChange,
  onPointToggle,
  onSelectPlayer,
  selectedPlayer,
  pointOrError,
  statView,
  players,
}) => {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "start",
        gap: 10,
        marginBottom: 15,
      }}
    >
      <ButtonRow
        active={statView}
        onChange={(val) => onStatChange(val)}
        labels={["team", "players"]}
        icons={["users", "user"]}
      />
      <ButtonRow
        active={pointOrError}
        onChange={(val) => onPointToggle(val)}
        labels={["points", "errors"]}
        icons={["check", "close"]}
      />
      {statView === "players" && (
        <ButtonRow
          active={selectedPlayer}
          onChange={(val) => onSelectPlayer(val)}
          labels={players}
          direction={"column"}
          width={47}
        />
      )}
      {/* 
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
      </View> */}
    </View>
  );
};

export default FilterComponent;

const styles = StyleSheet.create({
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
