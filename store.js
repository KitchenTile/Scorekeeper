import { create } from "zustand";

const initialScore = {
  score: 0,
  myScore: 0,
  oppScore: 0,
};

const initialSet = () => ({
  lineChartScore: [
    {
      score: 0,
      author: "none",
      method: "No Points Yet",
      type: null,
      reason: null,
      isMistake: null,
    },
  ],
  scores: { ...initialScore },
  winner: "",
  //   number: 1,
});

export const useMatchStore = create((set, get) => ({
  teams: ["", ""],
  players: [],
  sets: [initialSet()],
  currentSetIndex: 0,
  currentPoint: {
    reason: null,
    author: null,
    method: null,
    type: null,
    isMistake: null,
  },
  modalVisible: { setScore: false, setPlayers: true },

  // State setters
  setModalVisible: (modal) => set({ modalVisible: modal }),
  setCurrentPoint: (point) => set({ currentPoint: point }),
  setTeams: (teams) => set({ teams }),
  setPlayers: (players) => set({ players }),

  // Player handlers
  addPlayer: (player) =>
    set((state) =>
      state.players.includes(player)
        ? {}
        : { players: [...state.players, player] }
    ),
  removePlayer: (idx) =>
    set((state) => ({
      players: state.players.filter((_, i) => i !== idx),
    })),

  // Confirm point
  handleConfirm: () => {
    const { teams, currentPoint, sets, currentSetIndex } = get();
    const updatedSets = [...sets];
    const setObj = updatedSets[currentSetIndex];
    const isTeamA = currentPoint.type === teams[0];

    // Update scores
    const newScores = {
      myScore: isTeamA ? setObj.scores.myScore + 1 : setObj.scores.myScore,
      oppScore: !isTeamA ? setObj.scores.oppScore + 1 : setObj.scores.oppScore,
      score: isTeamA ? setObj.scores.score + 1 : setObj.scores.score - 1,
    };

    // Check win
    let winner = "";
    if (
      (isTeamA && newScores.myScore >= 5 && newScores.score >= 1) ||
      (!isTeamA && newScores.oppScore >= 5 && newScores.score <= -1)
    ) {
      winner = currentPoint.type;
      updatedSets.push(initialSet());
      set({ currentSetIndex: updatedSets.length - 1 });
    }

    setObj.scores = newScores;
    setObj.lineChartScore.push({
      score: newScores.score,
      author: currentPoint.author,
      method: currentPoint.method,
      type: currentPoint.type,
      reason: currentPoint.reason,
      isMistake: currentPoint.reason === "Defence Mistake",
    });
    setObj.winner = winner;
    setObj.number = currentSetIndex + 1;

    set({
      sets: updatedSets,
      currentPoint: {
        reason: null,
        author: null,
        method: null,
        type: null,
        isMistake: null,
      },
      modalVisible: { ...get().modalVisible, setScore: false },
    });
  },
}));
