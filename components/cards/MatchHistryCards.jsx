import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native";

const MatchHistryCards = ({ match, setSelectedMatchId }) => {
  const matchDate = new Date(match.time_created);

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
