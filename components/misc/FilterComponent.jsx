import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import ButtonRow from "./ButtonRow";
import PlayerButtonRow from "./PlayerButtonRow";

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
    <View style={{ flexDirection: "column" }}>
      <View style={styles.wrapper}>
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
      </View>
      {statView === "players" && (
        <PlayerButtonRow
          labels={players}
          onChange={(val) => onSelectPlayer(val)}
          active={selectedPlayer}
        />
      )}
    </View>
  );
};

export default FilterComponent;

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    justifyContent: "start",
    gap: 10,
    marginBottom: 15,
  },
});
