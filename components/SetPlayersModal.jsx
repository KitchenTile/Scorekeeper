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

const SetPlayersModal = ({
  players,
  modalVisible,
  handlePlayerDelete,
  handlePlayerSubmit,
  handleTeamSubmit,
  onConfirm,
  teams,
}) => {
  return (
    <Modal visible={modalVisible} transparent animationType="slide">
      <View style={styles.modalBackground}>
        <View style={styles.modalContent}>
          <View>
            <Text style={styles.modalTxt}>
              Enter teams' names (3 letters MAX)
            </Text>
            <TeamsComponent handleTeamSubmit={handleTeamSubmit} teams={teams} />
          </View>
          <Text style={styles.modalTxt}>
            Enter the team's players (tap to delete)
          </Text>
          <View style={styles.playersContainer}>
            {Array.from({ length: 9 }).map((_, index) =>
              players[index] ? (
                <Text
                  style={styles.setPlayer}
                  key={index}
                  onPress={() => handlePlayerDelete(index)}
                >
                  {players[index]}
                </Text>
              ) : (
                <TextInput
                  key={index}
                  onBlur={(e) =>
                    e.nativeEvent.text !== ""
                      ? handlePlayerSubmit(e.nativeEvent.text)
                      : null
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
            onPress={onConfirm}
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
