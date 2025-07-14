import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Modal } from "react-native-web";
import SetBreakdownCard from "../cards/SetBreakdownCard";

const PrevMatchModal = ({ isVisible, match }) => {
  const [selectedPlayer, setSelectedPlayer] = useState(match.players[0]);
  const [pointOrError, setPointOrError] = useState("points");
  const [statView, setStatView] = useState("team");
  const [activeTab, setActiveTab] = useState(0);

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

  //   match.gameSets.map((sets) => {
  //     console.log(sets.lineChartScore);
  //   });

  //   const sets =

  Object.entries(match.gameSets).map(([key, value]) => {
    console.log([key, value]);
  });

  return (
    <Modal visible={isVisible} transparent animationType="slide">
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTxt}>{match.teams[0]}</Text>

          {Object.entries(match.gameSets).map(([key, value]) => {
            <SetBreakdownCard
              set={value}
              index={key}
              isActive={activeTab === key}
              onToggle={() => {
                activeTabToggle(index);
                activeStatToggle("team");
              }}
              statView={statView}
              onStatChange={activeStatToggle}
              pointOrError={pointOrError}
              onPointToggle={pointOrErrorToggle}
              players={match.players}
              selectedPlayer={selectedPlayer}
              onSelectPlayer={setSelectedPlayer}
            />;
          })}
          {/* {match.gamesets.lineChartScore.map((set, index) => {
            <SetBreakdownCard
              set={set}
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
              //   players={match.players}
              selectedPlayer={selectedPlayer}
              onSelectPlayer={setSelectedPlayer}
            />;
          })} */}
        </View>
      </View>
    </Modal>
  );
};

export default PrevMatchModal;

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },

  modalContainer: {
    width: "100%",
    minHeight: "95%",
    gap: 20,
    backgroundColor: "#161F23",
    paddingBlock: 20,
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },

  modalTxt: {
    fontSize: 18,
    color: "white",
    fontWeight: "bold",
    marginBottom: 10,
  },

  arrowBack: {},

  halfMoon: {},
});
