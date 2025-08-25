import React, { useEffect, useState } from "react";
import TeamsComponent from "./TeamsComponent";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  SafeAreaView,
  TextInput,
} from "react-native";
import { useMatchStore } from "@/stores/store";

const SetPlayersModal = () => {
  const modalVisible = useMatchStore((state) => state.modalVisible);
  const setModalVisible = useMatchStore((state) => state.setModalVisible);
  const players = useMatchStore((state) => state.players);
  const oppPlayers = useMatchStore((state) => state.oppPlayers);
  const addPlayer = useMatchStore((state) => state.addPlayer);
  const removePlayer = useMatchStore((state) => state.removePlayer);
  const [oppTeamsPlayers, setOppTeamsPlayers] = useState(false);

  useEffect(() => {
    console.log(players);
  }, [players]);

  return (
    <Modal visible={modalVisible.setPlayers} transparent animationType="slide">
      <View style={styles.modalBackground}>
        <View style={styles.modalContent}>
          <View
            style={{ width: "80%", paddingBlock: 20, alignItems: "center" }}
          >
            <Text style={styles.modalTxt}>
              Enter teams' names (3 letters MAX)
            </Text>
            <TeamsComponent />
          </View>
          <Text style={styles.modalTxt}>
            {oppTeamsPlayers
              ? "Enter opponent team's players"
              : "Enter your team's players (tap to delete)"}
          </Text>
          <View style={styles.playersContainer}>
            {Array.from({ length: 9 }).map((_, index) =>
              (oppTeamsPlayers ? oppTeamsPlayers[index] : players[index]) ? (
                <Text
                  style={styles.setPlayer}
                  key={index}
                  onPress={() => removePlayer(index)}
                >
                  {oppTeamsPlayers ? oppPlayers[index] : players[index]}
                </Text>
              ) : (
                <TextInput
                  key={index}
                  keyboardType="numeric"
                  onEndEditing={(e) =>
                    e.nativeEvent.text !== "" && oppTeamsPlayers
                      ? addPlayer(e.nativeEvent.text, true)
                      : addPlayer(e.nativeEvent.text)
                  }
                  style={[
                    styles.setPlayer,
                    {
                      backgroundColor: players[index]
                        ? "#586DFF"
                        : "transparent",
                      borderWidth: 2,
                      borderColor: "#586DFF",
                    },
                  ]}
                />
              )
            )}
          </View>
          <TouchableOpacity
            style={[
              styles.bttn,
              {
                backgroundColor: players.length < 6 ? "" : "#78C93C",
                borderColor: players.length < 6 ? "#3A464E" : "#488719",
              },
            ]}
            onPress={() =>
              oppTeamsPlayers
                ? setModalVisible({ ...modalVisible, setPlayers: false })
                : setOppTeamsPlayers(true)
            }
            disabled={players.length < 6}
          >
            <Text
              style={[
                styles.bttnTxt,
                {
                  color:
                    players.length < 6 ? "rgba(255, 255, 255, 0.3)" : "white",
                },
              ]}
            >
              {!oppTeamsPlayers ? "Continue" : "Confirm"}
            </Text>
          </TouchableOpacity>

          {/* <TouchableOpacity
            style={[
              styles.bttn,
              {
                backgroundColor: players.length < 6 ? "" : "#78C93C",
                borderColor: players.length < 6 ? "#3A464E" : "#488719",
              },
            ]}
            onPress={() =>
              setModalVisible({ ...modalVisible, setPlayers: false })
            }
            disabled={players.length < 6}
          >
            <Text
              style={[
                styles.bttnTxt,
                {
                  color:
                    players.length < 6 ? "rgba(255, 255, 255, 0.3)" : "white",
                },
              ]}
            >
              {oppPlayers.length < 6 ? "Continue" : "Confirm"}
            </Text>
          </TouchableOpacity> */}
        </View>
      </View>
    </Modal>
  );
};

export default SetPlayersModal;

const styles = StyleSheet.create({
  //general modal and bkg
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },

  modalContent: {
    minWidth: "90%",
    minHeight: 500,
    gap: 20,
    backgroundColor: "#161F23",
    paddingBlock: 20,
    borderRadius: 10,
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    borderWidth: 2,
    borderColor: "#3A464E",
  },

  modalTxt: {
    fontSize: 18,
    color: "white",
    fontWeight: "bold",
    marginBottom: 10,
  },

  //inputs, buttons and labels
  setPlayer: {
    height: 60,
    borderColor: "black",
    borderWidth: 1,
    color: "white",
    borderStyle: "solid",
    borderRadius: 10,
    textAlign: "center",
    backgroundColor: "#586DFF",
    lineHeight: 54,
    fontSize: 18,
    fontWeight: "bold",
    width: "30%",
  },

  playersContainer: {
    display: "flex",
    gap: 10,
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "center",
    borderColor: "black",
    textAlign: "center",
    minWidth: "60%",
    maxWidth: "80%",
  },

  bttn: {
    backgroundColor: "#78C93C",
    borderStyle: "solid",
    borderWidth: 2,
    borderColor: "#488719",
    paddingBlock: 10,
    paddingInline: 20,
    borderRadius: 10,
    width: "90%",
  },

  bttnTxt: {
    fontSize: 18,
    color: "white",
    textAlign: "center",
    fontWeight: 600,
  },
});
