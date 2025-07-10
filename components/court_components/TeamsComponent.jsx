import { useMatchStore } from "@/stores/store";
import { useEffect } from "react";
import { StyleSheet, Text } from "react-native";
import { TextInput, View } from "react-native-web";

const TeamsCompoenent = () => {
  const teams = useMatchStore((state) => state.teams);
  const setTeams = useMatchStore((state) => state.setTeams);

  const handleTeamSubmit = (input, idx) => {
    const updatedTeams = [...teams];
    updatedTeams[idx] = input.toUpperCase();
    setTeams(updatedTeams);
  };

  return (
    <View style={styles.teamsContainer}>
      <View style={styles.team}>
        <View style={styles.teamsCircle} />
        {teams?.[0] ? (
          <Text style={styles.teamsNameInput}>{teams[0]}</Text>
        ) : (
          <TextInput
            style={styles.teamsNameInput}
            maxLength="3"
            onBlur={(e) =>
              e.nativeEvent.text !== ""
                ? handleTeamSubmit(e.nativeEvent.text, 0)
                : null
            }
          />
        )}
      </View>
      <View style={styles.team}>
        {teams?.[1] ? (
          <Text style={styles.oppTeamsNameInput}>{teams[1]}</Text>
        ) : (
          <TextInput
            style={styles.oppTeamsNameInput}
            maxLength="3"
            onBlur={(e) =>
              e.nativeEvent.text !== ""
                ? handleTeamSubmit(e.nativeEvent.text, 1)
                : null
            }
          />
        )}
        <View style={styles.oppTeamsCircle} />
      </View>
    </View>
  );
};

export default TeamsCompoenent;

const styles = StyleSheet.create({
  teamsContainer: {
    width: "100%",
    position: "relative",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
  },

  team: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
  },

  teamsCircle: {
    width: 35,
    height: 35,
    borderRadius: "100%",
    borderStyle: "solid",
    borderWidth: 2,
    borderColor: "#111184",
    backgroundColor: "#586DFF",
  },

  oppTeamsNameInput: {
    height: 35,
    width: 75,
    lineHeight: 30,
    borderStyle: "solid",
    borderWidth: 2,
    borderColor: "#DC605B",
    borderRadius: 20,
    color: "white",
    textTransform: "uppercase",
    fontSize: 16,
    fontWeight: 700,
    textAlign: "center",
  },

  teamsNameInput: {
    height: 35,
    width: 75,
    lineHeight: 30,
    borderStyle: "solid",
    borderWidth: 2,
    borderColor: "#586DFF",
    borderRadius: 20,
    color: "white",
    textTransform: "uppercase",
    fontSize: 16,
    fontWeight: 700,
    textAlign: "center",
  },

  oppTeamsCircle: {
    width: 35,
    height: 35,
    borderRadius: "100%",
    borderStyle: "solid",
    borderWidth: 2,
    borderColor: "#B52924",
    backgroundColor: "#DC605B",
  },
});
