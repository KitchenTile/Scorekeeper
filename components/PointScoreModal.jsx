import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Modal } from "react-native";

const ScoreModal = ({
  modalVisible,
  setCurrentPoint,
  currentPoint,
  players,
  onConfirm,
  onClose,
  teams,
}) => {
  return (
    <Modal visible={modalVisible} transparent animationType="slide">
      {currentPoint.type === teams[0] ? (
        <View style={styles.modalBackground}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTxt}>Point Recap</Text>
            <View style={[styles.optionContainer, { width: "100%" }]}>
              {["Defence Mistake", "Our point"].map((reason) => (
                <TouchableOpacity
                  key={reason}
                  style={[
                    styles.methodButton,
                    currentPoint.reason === reason && styles.selectedOption,
                  ]}
                  onPress={() => {
                    setCurrentPoint({
                      ...currentPoint,
                      author: reason === "Defence Mistake" && "opp",
                      reason: reason,
                    });
                  }}
                >
                  <Text style={styles.methodButtonText}>{reason}</Text>
                </TouchableOpacity>
              ))}
            </View>
            <Text
              style={[
                styles.modalTxt,
                currentPoint.reason === "Defence Mistake" && {
                  color: "rgba(255, 255, 255, 0.3)",
                },
              ]}
            >
              Select player
            </Text>
            <View style={styles.optionContainer}>
              {players.map((player) => (
                <TouchableOpacity
                  key={player}
                  disabled={currentPoint.reason === "Defence Mistake"}
                  style={[
                    styles.optionButton,
                    currentPoint.author === player && styles.selectedOption,
                    currentPoint.reason === "Defence Mistake" &&
                      styles.disabled,
                  ]}
                  onPress={() => {
                    setCurrentPoint({ ...currentPoint, author: player });
                  }}
                >
                  <Text
                    style={[
                      styles.optionText,
                      currentPoint.reason === "Defence Mistake" && {
                        color: "rgba(255, 255, 255, 0.3)",
                      },
                    ]}
                  >
                    {player}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text
              style={[
                styles.modalTxt,
                currentPoint.reason === "Defence Mistake" && {
                  color: "rgba(255, 255, 255, 0.3)",
                },
              ]}
            >
              Select Score Method
            </Text>
            <View style={styles.optionContainer}>
              {["Spike", "Block", "Ace"].map((method) => (
                <TouchableOpacity
                  key={method}
                  disabled={currentPoint.reason === "Defence Mistake"}
                  style={[
                    styles.methodButton,
                    currentPoint.method === method && styles.selectedOption,
                    currentPoint.reason === "Defence Mistake" &&
                      styles.disabled,
                  ]}
                  onPress={() => {
                    setCurrentPoint({
                      ...currentPoint,
                      method: method,
                    });
                  }}
                >
                  <Text
                    style={[
                      styles.methodButtonText,
                      currentPoint.reason === "Defence Mistake" && {
                        color: "rgba(255, 255, 255, 0.3)",
                      },
                    ]}
                  >
                    {method}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <View style={styles.bttnContainer}>
              <TouchableOpacity
                style={styles.confirmButton}
                onPress={onConfirm}
              >
                <Text style={styles.bttnText}>Confirm</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
                <Text style={styles.bttnText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      ) : (
        <View style={styles.modalBackground}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTxt}>Point Recap</Text>
            <View style={styles.optionContainer}>
              {["Defence Mistake", "Opponent's point"].map((reason) => (
                <TouchableOpacity
                  key={reason}
                  style={[
                    styles.methodButton,
                    currentPoint.reason === reason && styles.selectedOption,
                  ]}
                  onPress={() => {
                    setCurrentPoint({
                      ...currentPoint,
                      author: reason === "Opponent's point" && "opp",
                      reason: reason,
                    });
                  }}
                >
                  <Text style={styles.methodButtonText}>{reason}</Text>
                </TouchableOpacity>
              ))}
            </View>
            <Text
              style={[
                styles.modalTxt,
                currentPoint.reason === "Opponent's point" && {
                  color: "rgba(255, 255, 255, 0.3)",
                },
              ]}
            >
              Select Player
            </Text>
            <View style={styles.optionContainer}>
              {players.map((player) => (
                <TouchableOpacity
                  key={player}
                  disabled={currentPoint.method === "Opponent's point"}
                  style={[
                    styles.optionButton,
                    currentPoint.author === player && styles.selectedOption,
                    currentPoint.reason === "Opponent's point" &&
                      styles.disabled,
                  ]}
                  onPress={() => {
                    setCurrentPoint({
                      ...currentPoint,
                      author: player,
                      // method: "Defence mistake",
                    });
                  }}
                >
                  <Text
                    style={[
                      styles.optionText,
                      currentPoint.reason === "Opponent's point" && {
                        color: "rgba(255, 255, 255, 0.3)",
                      },
                    ]}
                  >
                    {player}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            <Text
              style={[
                styles.modalTxt,
                currentPoint.reason === "Defence Mistake" && {
                  color: "rgba(255, 255, 255, 0.3)",
                },
              ]}
            >
              Select Score Method
            </Text>
            <View style={styles.optionContainer}>
              {["Spike", "Block out", "Ace"].map((method) => (
                <TouchableOpacity
                  key={method}
                  disabled={currentPoint.reason === "Defence Mistake"}
                  style={[
                    styles.methodButton,
                    currentPoint.method === method && styles.selectedOption,
                    currentPoint.reason === "Defence Mistake" &&
                      styles.disabled,
                  ]}
                  onPress={() => {
                    setCurrentPoint({
                      ...currentPoint,
                      method: method,
                    });
                  }}
                >
                  <Text
                    style={[
                      styles.methodButtonText,
                      currentPoint.reason === "Defence Mistake" && {
                        color: "rgba(255, 255, 255, 0.3)",
                      },
                    ]}
                  >
                    {method}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            <View style={styles.bttnContainer}>
              <TouchableOpacity
                style={styles.confirmButton}
                onPress={onConfirm}
              >
                <Text style={styles.bttnText}>Confirm</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
                <Text style={styles.bttnText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </Modal>
  );
};

export default ScoreModal;

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: "80%",
    // minHeight: "60%",
    backgroundColor: "#161F23",
    padding: 10,
    borderRadius: 15,
    alignItems: "center",
    border: "2px solid #3A464E",
  },
  modalTxt: {
    fontSize: 26,
    fontWeight: "bold",
    margin: 15,
    color: "white",
  },
  optionContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    width: "83%",
  },

  optionButton: {
    backgroundColor: "#586DFF",
    padding: 10,
    margin: 5,
    borderRadius: 5,
    minWidth: 60,
    minHeight: 60,
  },

  methodButtonText: {
    color: "white",
    fontSize: 18,
    textAlign: "center",
  },

  methodButton: {
    backgroundColor: "#586DFF",
    padding: 12,
    margin: 5,
    borderRadius: 5,
    minWidth: 60,
  },

  selectedOption: {
    backgroundColor: "#28a745",
  },

  optionText: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    fontSize: 24,
    color: "white",
  },

  bttnContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginBlock: 10,
  },

  confirmButton: {
    backgroundColor: "#28a745",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 20,
    minWidth: 109,
    width: "46%",
  },

  bttnText: {
    fontSize: 18,
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  cancelButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 20,
    backgroundColor: "#B52924",
    minWidth: 109,
    width: "46%",
  },
  cancelText: {
    fontSize: 18,
    color: "#FF0000",
  },

  disabled: {
    backgroundColor: "transparent",
    borderColor: "#3A464E",
    borderStyle: "solid",
    borderWidth: 2,
    // padding: 10,
    margin: 5,
    borderRadius: 5,
    minWidth: 60,
    // minHeight: 60,
  },
});
