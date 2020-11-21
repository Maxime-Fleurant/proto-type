import { createSlice } from '@reduxjs/toolkit';

const gameSlice = createSlice({
  name: 'game',
  initialState: {
    text: [],
    current_word: '',
    key: '',
    name: '',
    dbId: '',
    playerMap: {},
    players: {
      p1: null,
      p2: null,
      p3: null,
      p4: null,
    },
  },
  reducers: {
    keyStroke(state, action) {
      const pressedKey = action.payload;

      if (pressedKey === state.word[0]) {
        state.word = state.word.slice(1);

        if (!state.word) {
          state.index++;
          state.word = state.text[state.index];
        }
      }
    },

    addPlayer(state, action) {
      const newPlayer = action.payload;
      const emptySeat = Object.entries(state.players).find((player) => !player[1]);
      if (emptySeat && emptySeat[0]) {
        state.players[emptySeat[0]] = newPlayer;
        state.playerMap[newPlayer.key] = emptySeat[0];
      }
    },

    removePlayer(state, action) {
      const playerToRemove = Object.entries(state.players).find(
        (player) => player[1] && player[1].key === action.payload,
      );
      if (playerToRemove && playerToRemove[0]) {
        state.players[playerToRemove[0]] = null;
        delete state.playerMap[action.payload];
      }
    },

    addMainPlayer: (state, action) => {
      state.key = action.payload.key;
      state.name = action.payload.name;
      state.dbId = action.payload.dbId;
      state.current_word = action.payload.current_word;
    },

    processOpponentInput: (state, action) => {
      const { key, input } = action.payload;
      state.players[state.playerMap[key]].current_word = input;
    },
  },
});

export const playerMap = (state) => state.game.playerMap;
export const gameWord = (state) => state.game.word;
export const players = (state) => state.game.players;
export const p1 = (state) => state.game.players.p1;
export const p2 = (state) => state.game.players.p2;
export const p3 = (state) => state.game.players.p3;
export const p4 = (state) => state.game.players.p4;

export const { keyStroke, addPlayer, removePlayer, addMainPlayer, processOpponentInput } = gameSlice.actions;
export default gameSlice.reducer;
