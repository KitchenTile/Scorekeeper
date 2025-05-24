import React, { useEffect, useState } from "react";
import { ScrollView, View, Text } from "react-native-web";
import { useMatchStore } from "../../store";
import { StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import PlayersGraphs from "../../components/stats_components/PlayersGraphs";
import ErrorGraph from "../../components/stats_components/ErrorGraph";
import TeamsCompoenent from "@/components/court_components/TeamsComponent";

const stats = () => {
  const [activeTab, setActiveTab] = useState(null);
  const sets = useMatchStore((state) => state.sets);

  // useEffect(() => {
  //   console.log(activeTab);
  // }, [activeTab]);

  const activeTabToggle = (index) => {
    setActiveTab((prev) => {
      if (prev === index) {
        return null;
      } else {
        return index;
      }
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TeamsCompoenent />
      {sets.map((set, index) => (
        <View
          style={[
            styles.pointInfoContainer,
            {
              height: index === activeTab ? "" : 65,
              display: "flex",
              flexDirection: "column",
            },
          ]}
        >
          <View
            style={{
              maxHeight: 65,
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
            }}
          >
            <>
              <Text style={[styles.title, { lineHeight: 42 }]}>
                SET {index + 1} BREAKDOWN
              </Text>
            </>
            <TouchableOpacity
              style={[styles.optionButton, { textAlign: "center" }]}
              onPress={() => activeTabToggle(index)}
            >
              <AntDesign name="caretdown" size={20} color="white" />
            </TouchableOpacity>
          </View>
          <PlayersGraphs set={sets[index]} />
          <ErrorGraph set={sets[index]} />
        </View>
      ))}
    </ScrollView>
  );
};

export default stats;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#161F23",
    flex: 1,
    flexDirection: "column",
    marginTop: 50,
    padding: 20,
    height: "100%",
    overflow: "scroll",
    // maxWidth: "800px",
  },

  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "white",
  },

  pointInfoContainer: {
    width: "100%",
    height: 80,
    borderWidth: 2,
    borderColor: "#3A464E",
    borderRadius: 20,
    marginTop: 20,
    padding: 10,
    marginInline: "auto",
    overflow: "hidden",
  },

  infoContainer: {
    width: "90%",
    height: 170,
    position: "absolute",
    bottom: "12.5%",
    left: "5%",
    borderWidth: 2,
    borderColor: "#3A464E",
    borderRadius: 20,
    // overflow: "hidden",
    marginInline: "auto",
    flexDirection: "row",
    justifyContent: "space-between",
  },

  bttnsContainer: {
    position: "absolute",
    bottom: "3%",
    width: "90%",
    left: "5%",
    flexDirection: "row",
    justifyContent: "space-between",
    height: 40,
    marginBlock: 20,
  },

  bttn: {
    width: "48.5%",
    height: 65,
    backgroundColor: "#78C93C",
    borderWidth: 2,
    borderColor: "#488719",
    position: "relative",
    paddingBlock: 10,
    paddingInline: 20,
    borderRadius: 15,
  },

  bttnOpp: {
    width: "48.5%",
    height: 65,
    backgroundColor: "#DC605B",
    borderWidth: 2,
    borderColor: "#B52924",
    position: "relative",
    paddingBlock: 10,
    paddingInline: 20,
    borderRadius: 15,
  },

  bttnTxt: {
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -60%)",
    fontSize: 34,
    lineHeight: 28,
    textAlign: "center",
    color: "rgb(0,0,0)",
    fontWeight: 600,
  },

  optionButton: {
    backgroundColor: "#586DFF",
    padding: 3,
    paddingTop: 0,
    margin: 5,
    borderRadius: 5,
    minWidth: 30,
    maxHeight: 30,
    borderStyle: "solid",
    borderWidth: 2,
    borderColor: "#3c4cbb",
  },

  text: {
    fontSize: 42,
    fontWeight: 600,
    textAlign: "center",
  },

  infoIcon: {
    position: "absolute",
    top: "-5%",
    left: "95%",
    borderRadius: "100%",
    width: 30,
    height: 30,
    backgroundColor: "#161F23",
    borderStyle: "solid",
    borderWidth: 2,
    borderColor: "#3A464E",
    zIndex: 10,
  },
});
