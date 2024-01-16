import { createSlice } from "@reduxjs/toolkit";
import { Chess, Color, Square } from "chess.js";
import sanitizePos from "../../utils/sanitize-pos";

const FEN = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";

// const FEN =
//   "r3k2r/ppp2ppp/2nq1n2/2bQPb2/2B1pB2/2N2N2/PPP2PPP/R3K2R w KQkq - 0 1";
export type ChessInitialStateType = {
  fen: string;
  availableMoves: MoveType[];
  check: CheckType;
  endingGame: {
    endedBy: "checkmate" | "stalemate" | "";
    color?: Color | "";
  };
};

type CheckType = {
  isCheck: boolean;
  king: "k" | "K" | "";
};

type MovePayloadType = {
  from: Square;
  to: string;
};

type MovesPayloadType = {
  from: Square;
  piece: string;
};

type MoveType = {
  from: Square; //san: Kg4, Nf6, etc
  to: string; //basically co-oridnates of chess
};

const initialState: ChessInitialStateType = {
  fen: FEN,
  availableMoves: [],
  check: {
    isCheck: false,
    king: "",
  },
  endingGame: {
    endedBy: "",
  },
};

const chessSlice = createSlice({
  name: "chessGame",
  initialState,
  reducers: {
    moves: (state, { payload }: { payload: MovesPayloadType }) => {
      const chess = new Chess(state.fen);
      const sanArray = chess.moves({ square: payload.from });
      console.log(sanArray);
      const arr: Array<MoveType> = [];
      sanArray.map((san) => {
        //SAN is Standard Algrebaric Notation for chess where a move can be describe
        if (payload.piece === "k") {
          //This logic is for castling when we get payload.piece to be BLACK KING
          if (san === "O-O") {
            //(O-O: KING'S SIDE CASTLE)
            arr.push({ from: payload.from, to: "g8" });
          }
          if (san === "O-O-O") {
            //(O-O-O: QUEEN'S SIDE CASTLE)
            arr.push({ from: payload.from, to: "c8" });
          }
          arr.push({ from: payload.from, to: sanitizePos(san) });
        } else if (payload.piece === "K") {
          //This logic is for castling when we get payload.piece to be WHITE KING
          if (san === "O-O") {
            arr.push({ from: payload.from, to: "g1" });
          }
          if (san === "O-O-O") {
            arr.push({ from: payload.from, to: "c1" });
          }
          arr.push({ from: payload.from, to: sanitizePos(san) });
        } else arr.push({ from: payload.from, to: sanitizePos(san) });
      });
      state.availableMoves = arr;
    },

    resetAvailableMoves: (state) => {
      state.availableMoves = [];
    },

    move: (state, { payload }: { payload: MovePayloadType }) => {
      const chess = new Chess(state.fen);

      chess.move({ from: payload.from, to: payload.to });
      state.fen = chess.fen();
      state.availableMoves = [];
    },

    isCheck: (state) => {
      const chess = new Chess(state.fen);
      const color = chess.turn();
      const isCheck = chess.isCheck();
      if (isCheck) {
        state.check.king = color === "b" ? "k" : "K";
        state.check.isCheck = isCheck;
      } else {
        state.check.isCheck = false;
        state.check.king = "";
      }
    },

    isGameOver: (state) => {
      const chess = new Chess(state.fen);
      if (chess.isCheckmate()) {
        const color = chess.turn();
        state.endingGame.endedBy = "checkmate";
        state.endingGame.color = color === "b" ? "w" : "b";
      } else if (chess.isStalemate()) {
        state.endingGame.endedBy = "stalemate";
      } else {
        state.endingGame.endedBy = "";
      }
    },

    //used in modal to reset the game
    resetGame: (state) => {
      const chess = new Chess(state.fen);
      chess.reset();
      state.fen = chess.fen();
      state.availableMoves = [];
      state.check = {
        isCheck: false,
        king: "",
      };
      state.endingGame = {
        endedBy: "",
      };
    },
  },
});
export const {
  moves,
  move,
  resetAvailableMoves,
  isCheck,
  isGameOver,
  resetGame,
} = chessSlice.actions;
export default chessSlice.reducer;
