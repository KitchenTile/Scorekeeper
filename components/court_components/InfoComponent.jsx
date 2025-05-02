import React from "react";
import { View, Text } from "react-native";

const InfoComponent = () => {
  return (
    <View
      style={{
        height: "100%",
        width: "100%",
        paddingBlock: 10,
        paddingInline: 10,
      }}
    >
      <Text
        style={[
          {
            color: "white",
            textAlign: "center",
            fontSize: 20,
            marginBottom: 10,
            fontWeight: 600,
          },
        ]}
      >
        INFO
      </Text>
      <View
        style={{
          display: "grid",
          gridTemplateRows: "repeat(4, 1fr)",
          gridTemplateColumns: "repeat(2, 1fr)",
          justifyItems: "center",
          gap: 3,
        }}
      >
        {Object.entries(POINTMETHODS).map(([key, val]) => (
          <Text
            key={key}
            style={[
              {
                fontSize: 14,
                color: "white",
              },
            ]}
          >
            {key}: {val}
          </Text>
        ))}
        {Object.entries(MISTAKEMETHODS).map(([key, val]) => (
          <Text
            key={key}
            style={[
              {
                fontSize: 14,
                color: "rgba(220, 96, 91, 1.00)",
              },
            ]}
          >
            {key}: {val}
          </Text>
        ))}
      </View>
    </View>
  );
};

export default InfoComponent;

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
