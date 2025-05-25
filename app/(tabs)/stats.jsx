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
  const [statView, setStatView] = useState("team");

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

  const activeStatToggle = (e) => {
    setStatView((prev) => {
      if (prev === e) {
        return prev;
      } else {
        return e;
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
              style={[
                styles.smallOptionButton,
                {
                  textAlign: "center",
                  padding: activeTab === index ? 3 : 0,
                  paddingTop: activeTab === index ? 3 : 0,
                },
              ]}
              onPress={() => {
                activeTabToggle(index);
                activeStatToggle("team");
              }}
            >
              <view
                style={{ rotate: activeTab === index ? "180deg" : "360deg" }}
              >
                <AntDesign name="caretdown" size={20} color="white" />
              </view>
            </TouchableOpacity>
          </View>
          <View
            style={{
              display: index === activeTab ? "flex" : "none",
            }}
          >
            <View style={styles.bttnsContainer}>
              <TouchableOpacity
                style={[
                  styles.optionButton,
                  {
                    backgroundColor:
                      statView === "team" ? "#586DFF" : "transparent",
                  },
                ]}
                onPress={() => activeStatToggle("team")}
              >
                <Text
                  style={[
                    styles.bttnTxt,
                    {
                      color: statView === "team" ? "white" : "#586DFF",
                    },
                  ]}
                >
                  TEAM
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.optionButton,
                  {
                    backgroundColor:
                      statView === "players" ? "#586DFF" : "transparent",
                  },
                ]}
                onPress={() => activeStatToggle("players")}
              >
                <Text
                  style={[
                    styles.bttnTxt,
                    {
                      color: statView === "players" ? "white" : "#586DFF",
                    },
                  ]}
                >
                  PLAYERS
                </Text>
              </TouchableOpacity>
            </View>
            {statView === "team" ? (
              <View>
                <PlayersGraphs set={sets[index]} />
                <ErrorGraph set={sets[index]} />
              </View>
            ) : (
              <View></View>
            )}
          </View>
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
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    textAlign: "center",
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

  bttnTxt: {
    fontSize: 22,
    textAlign: "center",
    color: "white",
    lineHeight: 35,
  },

  smallOptionButton: {
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

  optionButton: {
    backgroundColor: "#586DFF",
    padding: 3,
    paddingTop: 0,
    marginBottom: 15,
    borderRadius: 5,
    minWidth: "48%",
    minHeight: 40,
    borderStyle: "solid",
    borderWidth: 2,
    borderColor: "#3c4cbb",
  },

  text: {
    fontSize: 42,
    fontWeight: 600,
    textAlign: "center",
  },
});
