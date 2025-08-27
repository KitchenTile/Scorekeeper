export const POINTMETHODS = ["Ace", "Block", "KILL", "TIP"];

export const MISTAKEMETHODS = [
  "Communication",
  "Passing Error",
  "Serving Error",
  "Hitting Error",
  "Free ball",
  "Court Coverage",
];

export const playersPointsPerSetOrganizer = (players, set, team) => {
  const playerObj = {};
  players.forEach((e) => {
    playerObj[e] = 0;
  });

  for (let i = 0; i < set.lineChartScore.length; i++) {
    if (
      !set.lineChartScore[i].isMistake &&
      players.includes(set.lineChartScore[i].author) &&
      set.lineChartScore[i].type === team
    ) {
      playerObj[set.lineChartScore[i].author]++;
    }
  }

  return playerObj;
};

export const pointByMethodOrganizer = (team, set) => {
  const methodObj = {};
  POINTMETHODS.forEach((e) => {
    methodObj[e] = 0;
  });

  for (let i = 0; i < set.lineChartScore.length; i++) {
    if (
      POINTMETHODS.includes(set.lineChartScore[i].method) &&
      set.lineChartScore[i].type === team
    ) {
      methodObj[set.lineChartScore[i].method]++;
    }
  }
  return methodObj;
};

export const errorOrganizer = (players, set, team) => {
  const errorObj = {};
  const playersObj = {};
  MISTAKEMETHODS.forEach((e) => {
    errorObj[e] = 0;
  });
  players.forEach((e) => {
    playersObj[e] = 0;
  });

  for (let i = 0; i < set.lineChartScore.length; i++) {
    const point = set.lineChartScore[i];
    if (point.isMistake) {
      if (
        MISTAKEMETHODS.includes(point.method) &&
        set.lineChartScore[i].type !== team
      ) {
        errorObj[point.method]++;
      }
      if (
        players.includes(point.author) &&
        set.lineChartScore[i].type !== team
      ) {
        playersObj[point.author]++;
      }
    }
  }

  return { errorObj, playersObj };
};

export const playerPointsAcrossSetsOrganizer = (sets, player, team) => {
  const pointObj = {};
  let arr = Array.from({ length: sets.length }, (element, index) => index + 1);
  const playerPointsPerSet = {};
  const pointObjPerSet = sets.map(() => {
    const obj = {};
    POINTMETHODS.forEach((method) => (obj[method] = 0));
    return obj;
  });

  arr.map((set) => {
    playerPointsPerSet[set] = 0;
  });

  POINTMETHODS.forEach((point) => {
    pointObj[point] = 0;
  });

  sets.forEach((set, index) => {
    for (let i = 0; i < set.lineChartScore.length; i++) {
      if (
        !set.lineChartScore[i].isMistake &&
        POINTMETHODS.includes(set.lineChartScore[i].method) &&
        set.lineChartScore[i].author === player &&
        set.lineChartScore[i].type === team
      ) {
        pointObj[set.lineChartScore[i].method]++;
        pointObjPerSet[index][set.lineChartScore[i].method]++;
        playerPointsPerSet[index + 1]++;
      }
    }
  });

  return { pointObj, pointObjPerSet, playerPointsPerSet };
};

export const playerErrorAcrossSetsOrganizer = (sets, player, team) => {
  const errorObj = {};
  let arr = Array.from({ length: sets.length }, (element, index) => index + 1);
  const playerErrorsPerSet = {};
  const errorObjPerSet = sets.map(() => {
    const obj = {};
    MISTAKEMETHODS.forEach((method) => (obj[method] = 0));
    return obj;
  });

  arr.map((set) => {
    playerErrorsPerSet[set] = 0;
  });

  MISTAKEMETHODS.forEach((point) => {
    errorObj[point] = 0;
  });

  sets.forEach((set, index) => {
    for (let i = 0; i < set.lineChartScore.length; i++) {
      if (
        set.lineChartScore[i].isMistake &&
        MISTAKEMETHODS.includes(set.lineChartScore[i].method) &&
        set.lineChartScore[i].author === player &&
        set.lineChartScore[i].type !== team
      ) {
        errorObj[set.lineChartScore[i].method]++;
        errorObjPerSet[index][set.lineChartScore[i].method]++;
        playerErrorsPerSet[index + 1]++;
      }
    }
  });

  return { errorObj, errorObjPerSet, playerErrorsPerSet };
};
