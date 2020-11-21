import { configureStore } from '@reduxjs/toolkit';
import gameReducer from '../component/Game/gameSlice';

export default configureStore({
  reducer: {
    game: gameReducer,
  },
  devTools: true,
});
