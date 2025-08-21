import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useMatchStore } from "../../stores/store";
import { router } from "expo-router";

const FinishedMatchModal = () => {
  const modalVisible = useMatchStore((state) => state.modalVisible);
  const setModalVisible = useMatchStore((state) => state.setModalVisible);
  const resetGame = useMatchStore((state) => state.resetGame);
  const matchWinner = useMatchStore((state) => state.matchWinner);

  if (!modalVisible.setFinishedGame) return null;

  return (
    <Modal
      visible={modalVisible.setFinishedGame}
      transparent
      animationType="slide"
    >
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>Match Finished!</Text>
          <Text style={styles.modalTxt}>Winner: {matchWinner}</Text>

          <View style={styles.bttnContainer}>
            <TouchableOpacity
              style={styles.confirmButton}
              onPress={() => {
                resetGame();
              }}
            >
              <Text style={styles.bttnText}>Start New Game</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.confirmButton}
              onPress={() => {
                setModalVisible({ ...modalVisible, setFinishedGame: false });
                router.push("/stats");
              }}
            >
              <Text style={styles.bttnText}>See Game Stats</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default FinishedMatchModal;

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "white",
    marginBottom: 10,
  },
  modalContainer: {
    width: "100%",
    // height: "95%",
    maxHeight: "95%",
    // gap: 10,
    backgroundColor: "#161F23",
    paddingBlock: 20,
    paddingInline: 20,
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start ",
  },

  modalTxt: {
    fontSize: 18,
    color: "white",
    fontWeight: "bold",
    marginBottom: 10,
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

  arrowBack: {
    position: "absolute",
    top: 14,
    left: 16,
    padding: 8,
    elevation: 2,
    borderColor: "red",
  },
  halfMoon: {
    position: "absolute",
    width: "100%",
    height: 120,
    top: 0,
    zIndex: -1,
  },
});
