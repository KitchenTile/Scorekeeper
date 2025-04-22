import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  SafeAreaView,
  TextInput,
} from "react-native";

const SetPlayersModal = ({
  players,
  modalVisible,
  handlePlayerDelete,
  handlePlayerSubmit,
  onConfirm,
}) => {
  return (
    <Modal visible={modalVisible} transparent animationType="slide">
      <View style={styles.modalBackground}>
        <View style={styles.modalContent}>
          <View>
            <Text style={styles.modalTxt}>
              Enter teams' names (3 letters MAX)
            </Text>
            <View style={styles.teamsContainer}>
              <View style={styles.team}>
                <View style={styles.teamsCircle} />
                <TextInput style={styles.teamsNameInput} />
              </View>
              <View style={styles.team}>
                <TextInput style={styles.oppTeamsNameInput} />
                <View style={styles.oppTeamsCircle} />
              </View>
            </View>
          </View>
          <Text style={styles.modalTxt}>
            Enter the team's players (tap to delete)
          </Text>
          <View style={styles.playersContainer}>
            {players
              ? players.map((player, idx) => (
                  <Text
                    style={styles.setPlayer}
                    key={idx}
                    onPress={() => handlePlayerDelete(idx)}
                  >
                    {player}
                  </Text>
                ))
              : null}
          </View>

          <View style={styles.optionContainer}>
            <TextInput
              style={styles.input}
              onBlur={(e) =>
                e.nativeEvent.text !== ""
                  ? handlePlayerSubmit(e.nativeEvent.text)
                  : null
              }
            />
          </View>
          <TouchableOpacity style={styles.bttn}>
            <Text style={styles.bttnTxt} onPress={onConfirm}>
              Confirm
            </Text>
          </TouchableOpacity>
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
    width: "90%",
    minHeight: 500,
    gap: 20,
    backgroundColor: "#161F23",
    paddingBlock: 20,
    borderRadius: 10,
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    border: "2px solid #3A464E",
  },

  modalTxt: {
    fontSize: 18,
    color: "white",
    fontWeight: "bold",
    marginBottom: 10,
  },

  //inputs, buttons and labels
  teamsContainer: {
    width: "100%",
    position: "relative",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
  },

  team: {
    display: "flex",
    flexDirection: "row",
    gap: 5,
  },

  teamsCircle: {
    width: 30,
    height: 30,
    borderRadius: "100%",
    border: "2px solid #111184",
    backgroundColor: "#586DFF",
  },

  oppTeamsNameInput: {
    height: 30,
    width: 70,
    border: "2px solid #DC605B",
    borderRadius: 20,
    color: "white",
    textTransform: "uppercase",
    textAlign: "center",
  },

  teamsNameInput: {
    height: 30,
    width: 70,
    border: "2px solid #586DFF",
    borderRadius: 20,
    color: "white",
    textTransform: "uppercase",
    textAlign: "center",
  },

  oppTeamsCircle: {
    width: 30,
    height: 30,
    borderRadius: "100%",
    border: "2px solid #B52924",
    backgroundColor: "#DC605B",
  },

  optionContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },

  optionButton: {
    backgroundColor: "#007BFF",
    padding: 10,
    margin: 5,
    borderRadius: 5,
  },

  input: {
    height: 50,
    width: 50,
    borderColor: "black",
    borderWidth: 1,
    borderStyle: "solid",
    borderRadius: 10,
    textAlign: "center",
    backgroundColor: "#586DFF",
    fontSize: 18,
    color: "white",
  },

  setPlayer: {
    height: 60,
    width: 60,
    borderColor: "black",
    borderWidth: 1,
    color: "white",
    borderStyle: "solid",
    borderRadius: 10,
    textAlign: "center",
    backgroundColor: "#586DFF",
    lineHeight: 54,
    fontSize: "1.2em",
    fontWeight: "bold",
  },

  playersContainer: {
    display: "flex",
    gap: 10,
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "center",
    borderColor: "black",
    textAlign: "center",
    width: "60%",
  },

  bttn: {
    backgroundColor: "#78C93C",
    border: "2px solid #488719",
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
