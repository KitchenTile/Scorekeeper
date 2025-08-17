import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import FontAwesome from "@expo/vector-icons/FontAwesome";

const MatchHistryCards = ({ match, setSelectedMatchId }) => {
  const matchDate = new Date(match.time_created);

  const downloadMatchInfo = async () => {
    try {
      const matchInfo = JSON.stringify(match, null, 2);

      const fileURI =
        FileSystem.documentDirectory +
        `${match.teams[0]}_vs_${match.teams[1]}_${match.time_created}_match_info.json`;
      // console.log(fileURI);

      const isAvailable = await Sharing.isAvailableAsync();
      if (isAvailable) {
        await Sharing.shareAsync(fileURI);
      }

      // await FileSystem.writeAsStringAsync(fileURI, matchInfo);
    } catch (error) {
      console.log("Error saving file" + error);
    }
  };

  //   const gameSets = Object.fromEntries(
  //     Object.entries(match.gameSets).map(([key, value]) => {
  //       return [key, value];
  //     })
  //   );

  const getSetResults = () => {
    const setResults = {};
    match.teams.forEach((team) => {
      setResults[team] = 0;
    });

    Object.fromEntries(
      Object.entries(match.gameSets).map(([key, value]) => {
        setResults[value.winner]++;
        return [key, value];
      })
    );

    return setResults;
  };
  return (
    <View style={styles.cardContainer}>
      <Text
        style={[
          styles.teamsText,
          {
            color: match.match_winner === match.teams[0] ? "white" : "#3A464E",
          },
        ]}
      >
        {match.teams[0]} - {getSetResults()[match.teams[0]]}
      </Text>
      <Text
        style={{
          color: "white",
          fontSize: 15,
          textAlign: "end",
          lineHeight: 28,
          paddingRight: 10,
        }}
      >
        {matchDate.toLocaleString("en-GB", {
          timeZone: "UTC",
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        })}
      </Text>
      <Text
        style={[
          styles.teamsText,
          ,
          {
            color: match.match_winner === match.teams[1] ? "white" : "#3A464E",
          },
        ]}
      >
        {match.teams[1]} - {getSetResults()[match.teams[1]]}
      </Text>
      <View style={{ display: "flex", flexDirection: "row" }}>
        <TouchableOpacity
          onPress={() => {
            setSelectedMatchId(match.id);
          }}
        >
          <Text
            style={{
              color: "white",
              fontSize: 15,
              textAlign: "end",
              lineHeight: 28,
              paddingRight: 10,
            }}
          >
            See Details
          </Text>
        </TouchableOpacity>
        <Text
          style={{
            color: "white",
            fontSize: 15,
            textAlign: "end",
            lineHeight: 28,
            paddingRight: 10,
          }}
        >
          /
        </Text>
        <TouchableOpacity
          onPress={() => {
            downloadMatchInfo();
          }}
        >
          <FontAwesome
            name="share-square-o"
            size={16}
            color="white"
            style={{ position: "relative", top: "30%", left: "-20%" }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MatchHistryCards;

const styles = StyleSheet.create({
  cardContainer: {
    display: "flex",
    flexWrap: "wrap",
    alignContent: "space-between",
    width: "100%",
    height: 80,
    borderWidth: 2,
    borderColor: "#3A464E",
    borderRadius: 20,
    marginTop: 15,
    padding: 10,
  },

  teamsText: {
    fontSize: 20,
    paddingLeft: 5,
  },
});
