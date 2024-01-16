import { configureStore } from "@reduxjs/toolkit";
import chessSlice from "./chess/chessSlice";

export const store = configureStore({
  reducer: {
    chessGame: chessSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
