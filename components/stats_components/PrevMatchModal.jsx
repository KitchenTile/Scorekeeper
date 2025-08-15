import { StyleSheet, Text, View, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { Modal } from "react-native";
import SetBreakdownCard from "../cards/SetBreakdownCard";
import { TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import * as FileSystem from "expo-file-system";

const PrevMatchModal = ({
  isVisible,
  setIsVisible,
  setSelectedMatchId,
  match,
}) => {
  // const path = `${RNFS.DocumentDirectoryPath}/match_report.json`;

  const [selectedPlayer, setSelectedPlayer] = useState(match.players[0]);
  const [pointOrError, setPointOrError] = useState("points");
  const [statView, setStatView] = useState("team");
  const [activeTab, setActiveTab] = useState(0);
  // const data = JSON.stringify(match, null, 2);

  // const callback = (downloadProgress) => {
  //   const progress =
  //     downloadProgress.totalBytesWritten /
  //     downloadProgress.totalBytesExpectedToWrite;
  //   console.log(progress);
  // };

  // const downloadResumable = FileSystem.createDownloadResumable(
  //   "https://sheetjs.com/pres. Numbers",
  //   FileSystem.documentDirectory + "data.xlsx",
  //   {},
  //   callback
  // );

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

  const getSetResults = () => {
    const setResults = {};
    match.teams.forEach((team) => {
      setResults[team] = 0;
    });

    Object.fromEntries(
      Object.entries(match.gameSets).map(([key, value]) => {
        setResults[value.winner]++;
        return [key, value];
      })
    );

    return setResults;
  };

  const setsArray = () => {
    const sets = [];
    Object.entries(match.gameSets).map(([key, value]) => {
      sets.push(value);
    });

    return sets;
  };

  const handlePress = async () => {
    try {
      await RNFS.writeFile(path, data, "utf8");
      console.log("Success!");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal visible={isVisible} transparent animationType="slide">
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          {/* <View
            style={[
              styles.halfMoon,
              {
                backgroundColor:
                  match.match_winner === match.teams[0] ? "blue" : "red",
              },
            ]}
          /> */}
          <TouchableOpacity
            onPress={() => {
              setIsVisible(false);
              setSelectedMatchId(null);
            }}
          >
            <AntDesign
              name="left"
              size={22}
              color="white"
              style={styles.arrowBack}
            />
          </TouchableOpacity>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              gap: 20,
              textAlign: "center",
            }}
          >
            <Text
              style={[
                styles.modalTxt,
                {
                  color:
                    match.match_winner === match.teams[0] ? "white" : "#3A464E",
                },
              ]}
            >
              {match.teams[0]} - {getSetResults()[match.teams[0]]}
            </Text>
            <Text
              style={[
                styles.modalTxt,
                {
                  color:
                    match.match_winner === match.teams[1] ? "white" : "#3A464E",
                },
              ]}
            >
              {match.teams[1]} - {getSetResults()[match.teams[1]]}
            </Text>
          </View>
          <ScrollView
            contentContainerStyle={{
              maxWidth: "100%",
              minWidth: "99.9%",
              // backgroundColor: "red",
            }}
          >
            {setsArray().map((value, index) => (
              <SetBreakdownCard
                key={index}
                set={value}
                match={setsArray()}
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
                players={match.players}
                selectedPlayer={selectedPlayer}
                onSelectPlayer={setSelectedPlayer}
              />
            ))}
          </ScrollView>
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
    // gap: 10,
    backgroundColor: "#161F23",
    paddingBlock: 20,
    paddingInline: 20,
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    overflow: "scroll",
    justifyContent: "flex-start ",
  },

  modalTxt: {
    fontSize: 18,
    color: "white",
    fontWeight: "bold",
    marginBottom: 10,
  },

  arrowBack: { position: "relative", left: "-50%", color: "white" },

  halfMoon: {
    position: "absolute",
    width: "100%",
    height: 120,
    top: 0,
    zIndex: -1,
  },
});
