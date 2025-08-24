import { useMatchStore } from "@/stores/store";
import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Modal } from "react-native";

const ScoreModal = () => {
  const players = useMatchStore((state) => state.players);
  const currentPoint = useMatchStore((state) => state.currentPoint);
  const setCurrentPoint = useMatchStore((state) => state.setCurrentPoint);
  const modalVisible = useMatchStore((state) => state.modalVisible);
  const setModalVisible = useMatchStore((state) => state.setModalVisible);
  const teams = useMatchStore((state) => state.teams);
  const handleConfirm = useMatchStore((state) => state.handleConfirm);

  const pointReady =
    currentPoint.reason !== null &&
    currentPoint.author !== null &&
    currentPoint.method !== null;

  return (
    <Modal visible={modalVisible.setScore} transparent animationType="slide">
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
            <View style={[styles.optionContainer, { width: "100%" }]}>
              {currentPoint.reason === "Our point"
                ? Object.entries(POINTMETHODS).map((method) => (
                    <TouchableOpacity
                      key={method[1]}
                      disabled={currentPoint.reason === "Defence Mistake"}
                      style={[
                        styles.methodButton,
                        currentPoint.method === method[1] &&
                          styles.selectedOption,
                        currentPoint.reason === "Defence Mistake" &&
                          styles.disabled,
                      ]}
                      onPress={() => {
                        setCurrentPoint({
                          ...currentPoint,
                          method: method[1],
                        });
                      }}
                    >
                      <Text style={[styles.methodButtonText]}>{method[1]}</Text>
                    </TouchableOpacity>
                  ))
                : Object.entries(MISTAKEMETHODS).map((method) => (
                    <TouchableOpacity
                      key={method[1]}
                      disabled={currentPoint.reason === "Defence Mistake"}
                      style={[
                        styles.methodButton,
                        currentPoint.method === method[1] &&
                          styles.selectedOption,
                        currentPoint.reason === "Defence Mistake" &&
                          styles.disabled,
                      ]}
                      onPress={() => {
                        setCurrentPoint({
                          ...currentPoint,
                          method: method[1],
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
                        {method[1]}
                      </Text>
                    </TouchableOpacity>
                  ))}
            </View>

            <View style={styles.bttnContainer}>
              <TouchableOpacity
                disabled={
                  currentPoint.reason === "Defence Mistake"
                    ? false
                    : !pointReady
                }
                style={[
                  styles.confirmButton,
                  currentPoint.reason !== "Defence Mistake" &&
                    !pointReady && {
                      backgroundColor: "transparent",
                      borderColor: "#3A464E",
                      borderStyle: "solid",
                      borderWidth: 2,
                    },
                ]}
                onPress={() =>
                  handleConfirm(
                    currentPoint.editIndex !== null,
                    currentPoint.editIndex
                  )
                }
              >
                <Text style={styles.bttnText}>Confirm</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => {
                  setModalVisible({ ...modalVisible, setScore: false });
                  setCurrentPoint({ author: null, method: null, type: null });
                }}
              >
                <Text style={styles.bttnText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      ) : (
        <View style={styles.modalBackground}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTxt}>Point Recap</Text>
            <View style={[styles.optionContainer, { width: "100%" }]}>
              {["Defence Mistake", "Opp's point"].map((reason) => (
                <TouchableOpacity
                  key={reason}
                  style={[
                    styles.methodButton,
                    currentPoint.reason === reason && styles.selectedOption,
                  ]}
                  onPress={() => {
                    setCurrentPoint({
                      ...currentPoint,
                      author: reason === "Opp's point" && "opp",
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
                currentPoint.reason === "Opp's point" && {
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
                  disabled={currentPoint.method === "Opp's point"}
                  style={[
                    styles.optionButton,
                    currentPoint.author === player && styles.selectedOption,
                    currentPoint.reason === "Opp's point" && styles.disabled,
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
                      currentPoint.reason === "Opp's point" && {
                        color: "rgba(255, 255, 255, 0.3)",
                      },
                    ]}
                  >
                    {player}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            <Text style={[styles.modalTxt]}>Select Score Method</Text>
            <View style={[styles.optionContainer, { width: "100%" }]}>
              {currentPoint.reason === "Opp's point"
                ? Object.entries(POINTMETHODS).map((method) => (
                    <TouchableOpacity
                      key={method[1]}
                      disabled={currentPoint.reason === "Defence Mistake"}
                      style={[
                        styles.methodButton,
                        currentPoint.method === method[1] &&
                          styles.selectedOption,
                        currentPoint.reason === "Defence Mistake" &&
                          styles.disabled,
                      ]}
                      onPress={() => {
                        setCurrentPoint({
                          ...currentPoint,
                          method: method[1],
                        });
                      }}
                    >
                      <Text style={[styles.methodButtonText]}>{method[1]}</Text>
                    </TouchableOpacity>
                  ))
                : Object.entries(MISTAKEMETHODS).map((method) => (
                    <TouchableOpacity
                      key={method[1]}
                      style={[
                        styles.methodButton,
                        currentPoint.method === method[1] &&
                          styles.selectedOption,
                      ]}
                      onPress={() => {
                        setCurrentPoint({
                          ...currentPoint,
                          method: method[1],
                        });
                      }}
                    >
                      <Text style={[styles.methodButtonText]}>{method[1]}</Text>
                    </TouchableOpacity>
                  ))}
            </View>
            <View style={styles.bttnContainer}>
              <TouchableOpacity
                disabled={
                  currentPoint.reason === "Opp's Point" &&
                  currentPoint.method !== null
                    ? false
                    : !pointReady
                }
                style={[
                  styles.confirmButton,
                  !pointReady && {
                    backgroundColor: "transparent",
                    borderColor: "#3A464E",
                    borderStyle: "solid",
                    borderWidth: 2,
                  },
                ]}
                onPress={() => handleConfirm()}
              >
                <Text style={styles.bttnText}>Confirm</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => {
                  setModalVisible({ ...modalVisible, setScore: false });
                  setCurrentPoint({ author: null, method: null, type: null });
                }}
              >
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

const POINTMETHODS = {
  A: "Ace",
  B: "Block",
  K: "KILL",
  T: "TIP",
};

const MISTAKEMETHODS = {
  C: "Communication",
  PE: "Passing Error",
  SE: "Serving Error",
  HE: "Hitting Error",
  FB: "Free ball",
  CC: "Court Coverage",
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: "95%",
    backgroundColor: "#161F23",
    padding: 10,
    borderRadius: 15,
    alignItems: "center",
    borderColor: "#3A464E",
    borderStyle: "solid",
    borderWidth: 2,
  },
  modalTxt: {
    fontSize: 20,
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
    padding: 5,
    margin: 5,
    borderRadius: 5,
    width: "30%",
    height: 40,
    borderStyle: "solid",
    borderWidth: 2,
    borderColor: "#3c4cbb",
    textAlign: "ceenter",
    alignItems: "center",
  },

  methodButtonText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
  },

  methodButton: {
    backgroundColor: "#586DFF",
    padding: 10,
    margin: 5,
    borderRadius: 5,
    minWidth: 60,
    borderStyle: "solid",
    borderWidth: 2,
    borderColor: "#3c4cbb",
  },

  selectedOption: {
    backgroundColor: "#28a745",
    borderColor: "#28a745",
    borderStyle: "solid",
    borderWidth: 2,
  },

  optionText: {
    fontSize: 20,
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
