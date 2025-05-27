import { View } from "react-native-web";
import { useMatchStore } from "../../store";
import { useEffect } from "react";

const IndividualStats = ({ player }) => {
  const sets = useMatchStore((state) => state.sets);

  const SETS = [1, 2, 3, 4, 5];

  useEffect(() => {
    console.log(sets);
  }, [sets]);

  return <View></View>;
};

export default IndividualStats;
