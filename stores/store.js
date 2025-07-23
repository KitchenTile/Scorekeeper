import { create } from "zustand";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

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
  number: 1,
});

const calculateMatchWinner = (teams, sets) => {
  const wins = { [teams[0]]: 0, [teams[1]]: 0 };

  sets.forEach((set) => {
    if (set.winner === teams[0]) {
      wins[teams[0]]++;
    } else if (set.winner === teams[1]) {
      wins[teams[1]]++;
    }
  });

  if (wins[teams[0]] >= 3) return teams[0];
  if (wins[teams[1]] >= 3) return teams[1];
  return null;
};

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
  matchWinner: null,
  openedButton: { open: null, active: null },

  // State setters
  setModalVisible: (modal) => set({ modalVisible: modal }),
  setCurrentPoint: (point) => set({ currentPoint: point }),
  setTeams: (teams) => set({ teams }),
  setPlayers: (players) => set({ players }),

  setOpenedButton: (id) =>
    set({
      openedButton: id,
    }),

  updateMatchWinner: () => {
    const { sets, teams } = get();
    const winner = calculateMatchWinner(teams, sets);
    console.log(winner);
    set({ matchWinner: winner });
  },

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
    const { teams, currentPoint, sets, currentSetIndex, matchWinner } = get();
    const updatedSets = [...sets];
    const setObj = updatedSets[currentSetIndex];
    const isTeamA = currentPoint.type === teams[0];

    if (matchWinner) return;

    // Update scores
    const newScores = {
      myScore: isTeamA ? setObj.scores.myScore + 1 : setObj.scores.myScore,
      oppScore: !isTeamA ? setObj.scores.oppScore + 1 : setObj.scores.oppScore,
      score: isTeamA ? setObj.scores.score + 1 : setObj.scores.score - 1,
    };

    // Check win
    let winner = "";
    if (
      (isTeamA && newScores.myScore >= 2 && newScores.score >= 1) ||
      (!isTeamA && newScores.oppScore >= 2 && newScores.score <= -1)
    ) {
      winner = currentPoint.type;
      setObj.winner = winner;
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
    setObj.number = currentSetIndex + 1;

    get().updateMatchWinner();

    if (!get().matchWinner && winner) {
      updatedSets.push(initialSet());
      set({ currentSetIndex: updatedSets.length - 1 });
    }

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

export const useAuthStore = create((set, get) => ({
  isLoggedIn: false,
  isLoading: false,
  user: null,

  login: async (auth, email, password) => {
    set({ isLoading: true });

    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      console.log("response");

      console.log(response);

      set({ user: response.user, isLoading: false, isLoggedIn: true });
    } catch (error) {
      set({ isLoading: false });
      alert("Login failed: " + error.message);
    }
  },

  signUp: async (auth, email, password) => {
    set({ isLoading: true });

    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(response);

      set({ user: response.user, isLoading: false, isLoggedIn: true });
    } catch (error) {
      set({ isLoading: false });
      alert("Login failed: " + error.message);
    }
  },

  logout: () => set({ user: null, isLoggedIn: false }),
}));
