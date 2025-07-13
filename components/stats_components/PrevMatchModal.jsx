import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Modal } from "react-native-web";

const PrevMatchModal = ({ isVisible, match }) => {
  return (
    <Modal visible={isVisible} transparent animationType="slide">
      <Text>{match.teams[0]}</Text>
    </Modal>
  );
};

export default PrevMatchModal;

const styles = StyleSheet.create({});
