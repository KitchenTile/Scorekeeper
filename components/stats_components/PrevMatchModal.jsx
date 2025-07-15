import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Modal } from "react-native-web";
import SetBreakdownCard from "../cards/SetBreakdownCard";
import { TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";

const PrevMatchModal = ({
  isVisible,
  setIsVisible,
  setSelectedMatchId,
  match,
}) => {
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

  return (
    <Modal visible={isVisible} transparent animationType="slide">
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <TouchableOpacity
            onPress={() => {
              setIsVisible(false);
              setSelectedMatchId(null);
            }}
          >
            {/* <text style={styles.arrowBack}>BACK</text> */}
            <AntDesign
              name="caretdown"
              size={20}
              color="white"
              style={styles.arrowBack}
            />
          </TouchableOpacity>
          <Text style={styles.modalTxt}>{match.teams[0]}</Text>

          {Object.entries(match.gameSets).map(([key, value]) => (
            <>
              <SetBreakdownCard
                key={key}
                set={value}
                index={key}
                isActive={activeTab === key}
                onToggle={() => {
                  activeTabToggle(key);
                  activeStatToggle("team");
                }}
                statView={statView}
                onStatChange={activeStatToggle}
                pointOrError={pointOrError}
                onPointToggle={pointOrErrorToggle}
                players={match.players}
                selectedPlayer={selectedPlayer}
                onSelectPlayer={setSelectedPlayer}
              />
            </>
          ))}
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
    height: "95%",
    maxHeight: "95%",
    gap: 10,
    backgroundColor: "#161F23",
    paddingBlock: 20,
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    overflow: "scroll",
    // justifyContent: "space-between",
  },

  modalTxt: {
    fontSize: 18,
    color: "white",
    fontWeight: "bold",
    marginBottom: 10,
  },

  arrowBack: { position: "absolute", left: -190, top: 13, color: "white" },

  halfMoon: {},
});
