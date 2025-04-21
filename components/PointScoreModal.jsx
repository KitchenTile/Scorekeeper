import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Modal } from "react-native";

const ScoreModal = ({
  modalVisible,
  setCurrentPoint,
  currentPoint,
  players,
  onConfirm,
  onClose,
}) => {
  return (
    <Modal visible={modalVisible} transparent animationType="slide">
      {currentPoint.type === "myScore" ? (
        <View style={styles.modalBackground}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTxt}>Select player</Text>
            <View style={styles.optionContainer}>
              {players.map((player) => (
                <TouchableOpacity
                  key={player}
                  style={[
                    styles.optionButton,
                    currentPoint.author === player && styles.selectedOption,
                  ]}
                  onPress={() => {
                    setCurrentPoint({ ...currentPoint, author: player });
                  }}
                >
                  <Text>player {player}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.modalTxt}>Select Score Method</Text>
            <View style={styles.optionContainer}>
              {["Spike", "Block", "Ace", "Opponent's Error"].map((method) => (
                <TouchableOpacity
                  key={method}
                  style={[
                    styles.optionButton,
                    currentPoint.method === method && styles.selectedOption,
                  ]}
                  onPress={() => {
                    setCurrentPoint({
                      ...currentPoint,
                      method: method,
                    });
                  }}
                >
                  <Text>{method}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <TouchableOpacity style={styles.confirmButton} onPress={onConfirm}>
              <Text style={styles.confirmText}>Confirm</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.confirmButton} onPress={onClose}>
              <Text style={styles.confirmText}>Cancel</Text>
            </TouchableOpacity>
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
                    styles.optionButton,
                    currentPoint.method === reason && styles.selectedOption,
                  ]}
                  onPress={() => {
                    setCurrentPoint({ ...currentPoint, method: reason });
                  }}
                >
                  <Text>{reason}</Text>
                </TouchableOpacity>
              ))}
            </View>
            <Text style={styles.modalTxt}>Select player</Text>
            <View style={styles.optionContainer}>
              {players.map((player) => (
                <TouchableOpacity
                  key={player}
                  style={[
                    styles.optionButton,
                    currentPoint.author === player && styles.selectedOption,
                  ]}
                  onPress={() => {
                    setCurrentPoint({ ...currentPoint, author: player });
                  }}
                >
                  <Text>player {player}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.modalTxt}>Select Score Method</Text>
            <View style={styles.optionContainer}>
              {["Spike", "Block out", "Ace"].map((method) => (
                <TouchableOpacity
                  key={method}
                  style={[
                    styles.optionButton,
                    currentPoint.method === "Defence Mistake, " + method &&
                      styles.selectedOption,
                  ]}
                  onPress={() => {
                    setCurrentPoint({
                      ...currentPoint,
                      method: "Defence Mistake, " + method,
                    });
                  }}
                >
                  <Text>{method}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <TouchableOpacity style={styles.confirmButton} onPress={onConfirm}>
              <Text style={styles.confirmText}>Confirm</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.confirmButton} onPress={onClose}>
              <Text style={styles.confirmText}>Cancel</Text>
            </TouchableOpacity>
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
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
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
  selectedOption: {
    backgroundColor: "#ffcc00",
  },
  optionText: {
    fontSize: 16,
    color: "white",
  },
  confirmButton: {
    backgroundColor: "#28a745",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
  },
  confirmText: {
    fontSize: 18,
    color: "white",
    fontWeight: "bold",
  },
  cancelButton: {
    marginTop: 10,
  },
  cancelText: {
    fontSize: 16,
    color: "#FF0000",
  },
});
