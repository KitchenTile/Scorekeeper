import { View } from "react-native-web";
import { useMatchStore } from "../../store";
import { useEffect } from "react";

const IndividualStats = ({ player, set }) => {
  const sets = useMatchStore((state) => state.sets);

  const SETS = [1, 2, 3, 4, 5];
  console.log(set.number);

  const pointsOrganizer = () => {
    const pointObj = {};
    const pointObjPerSet = [{}, {}, {}, {}, {}];
    // const currentSet = {};

    POINTMETHODS.forEach((point) => {
      pointObj[point] = 0;
      //   currentSet[point] = 0;

      pointObjPerSet.forEach((set, index) => {
        pointObjPerSet[index][point] = 0;
      });
    });

    sets.forEach((set, index) => {
      for (let i = 0; i < set.lineChartScore.length; i++) {
        if (
          !set.lineChartScore[i].isMistake &&
          POINTMETHODS.includes(set.lineChartScore[i].method) &&
          set.lineChartScore[i].author === player
        ) {
          pointObj[set.lineChartScore[i].method]++;

          pointObjPerSet[index][set.lineChartScore[i].method]++;
        }
      }
    });

    console.log("player: " + player);
    console.log(pointObj);
    console.log(pointObjPerSet[set.number - 1]);

    // const oppObj = {};
    // POINTMETHODS.forEach((e) => {
    //   oppObj[e] = 0;
    // });

    // for (let i = 0; i < sets.lineChartScore.length; i++) {
    //   if (
    //     POINTMETHODS.includes(sets.lineChartScore[i].method) &&
    //     sets.lineChartScore[i].type
    //   ) {
    //     oppObj[sets.lineChartScore[i].method]++;
    //   }
    // }

    // return { playerObj, oppObj };
  };

  pointsOrganizer();
  useEffect(() => {
    console.log(sets);
  }, [sets]);

  return <View></View>;
};

export default IndividualStats;

const POINTMETHODS = ["Ace", "Block", "KILL", "TIP"];
