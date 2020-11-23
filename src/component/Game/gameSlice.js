import { createSlice } from '@reduxjs/toolkit';

const gameSlice = createSlice({
  name: 'game',
  initialState: {
    timer: 10,
    state: 'waiting',
    text: [],
    mainPlayer: {
      current_word: '',
      key: '',
      name: '',
      dbId: '',
      badType: 0,
      score: 0,
    },
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

      if (pressedKey === state.mainPlayer.current_word[0]) {
        state.mainPlayer.current_word = state.mainPlayer.current_word.substr(1);

        if (!state.mainPlayer.current_word) {
          state.mainPlayer.score++;
          state.mainPlayer.current_word = state.text[state.mainPlayer.score];
        }
      }
    },

    updateTime(state, action) {
      state.timer = action.payload;
    },

    addText(state, action) {
      state.text = action.payload;
    },

    updateRoomStatus(state, action) {
      console.log(action.payload, 'status');
      state.state = action.payload;
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
      state.mainPlayer.key = action.payload.key;
      state.mainPlayer.name = action.payload.name;
      state.mainPlayer.dbId = action.payload.dbId;
      state.mainPlayer.current_word = action.payload.current_word;
      state.mainPlayer.badType = action.payload.badType;
    },

    processOpponentInput: (state, action) => {
      const { key, input, badType } = action.payload;
      state.players[state.playerMap[key]].current_word = input;
      state.players[state.playerMap[key]].badType = badType;
    },
  },
});

export const mainPlayer = (state) => state.game.mainPlayer;
export const players = (state) => state.game.players;
export const p1 = (state) => state.game.players.p1;
export const p2 = (state) => state.game.players.p2;
export const p3 = (state) => state.game.players.p3;
export const p4 = (state) => state.game.players.p4;
export const gameState = (state) => state.game.state;
export const timer = (state) => state.game.timer;

export const {
  updateTime,
  keyStroke,
  addPlayer,
  removePlayer,
  addMainPlayer,
  processOpponentInput,
  addText,
  updateRoomStatus,
} = gameSlice.actions;
export default gameSlice.reducer;
