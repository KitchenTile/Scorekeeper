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
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: "80%",
    gap: 20,
    backgroundColor: "white",
    paddingBlock: 20,
    borderRadius: 10,
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  modalTxt: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
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
    height: 40,
    width: 40,
    borderColor: "black",
    borderWidth: 1,
    borderStyle: "solid",
    borderRadius: 10,
    textAlign: "center",
    backgroundColor: "beige",
  },

  setPlayer: {
    height: 60,
    width: 60,
    borderColor: "black",
    borderWidth: 1,
    borderStyle: "solid",
    borderRadius: 10,
    textAlign: "center",
    backgroundColor: "beige",
    lineHeight: 54,
    fontSize: "1.2em",
    fontWeight: "bold",
  },

  playersContainer: {
    display: "flex",
    gap: 10,
    flexDirection: "row",
    justifyContent: "center",
    borderColor: "black",
    textAlign: "center",
  },

  bttn: {
    backgroundColor: "#007BFF",
    paddingBlock: 10,
    paddingInline: 20,
    borderRadius: 5,
  },

  bttnTxt: {
    fontSize: 18,
    textAlign: "center",
    color: "rgb(0,0,0)",
    fontWeight: 600,
  },
});
