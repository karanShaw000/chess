import { createSlice } from "@reduxjs/toolkit";
import { Chess, Color, Square } from "chess.js";
import sanitizePos from "../../utils/sanitize-pos";
import { filterRedundantObject } from "@/utils/filter-redundant-object";

const FEN = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";

// const FEN = "rnbqkbnr/ppp1pppp/8/7P/8/8/PPPP2p1/RNBQKBNR b KQkq - 0 5";
export type ChessInitialStateType = {
  fen: string;
  turn: Color;
  availableMoves: MoveType[];
  check: CheckType;
  endingGame: {
    endedBy: "checkmate" | "stalemate" | "";
    color?: Color | "";
  };
  showPromoMove: MoveType | "";
};

type CheckType = {
  isCheck: boolean;
  king: "k" | "K" | "";
};

type MovePayloadType = {
  from: Square;
  to: string;
  promotion: "Q" | "B" | "R" | "N" | "q" | "b" | "r" | "n" | "";
};

type MovesPayloadType = {
  from: Square;
  piece: string;
};

export type MoveType = {
  from: Square; //san: Kg4, Nf6, etc
  to: string; //basically co-oridnates of chess
  promoOptions: ["Q", "B", "R", "N"] | ["q", "b", "r", "n"] | [];
};

const initialState: ChessInitialStateType = {
  fen: FEN,
  showPromoMove: "",
  turn: "w",
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
      const arr: Array<MoveType> = [];
      sanArray.map((san) => {
        //SAN is Standard Algrebaric Notation for chess where a move can be describe
        if (payload.piece === "k") {
          //This logic is for castling when we get payload.piece to be BLACK KING
          if (san === "O-O") {
            //(O-O: KING'S SIDE CASTLE)
            arr.push({ from: payload.from, to: "g8", promoOptions: [] });
          }
          if (san === "O-O-O") {
            //(O-O-O: QUEEN'S SIDE CASTLE)
            arr.push({ from: payload.from, to: "c8", promoOptions: [] });
          }
          arr.push({
            from: payload.from,
            to: sanitizePos(san),
            promoOptions: [],
          });
        } else if (payload.piece === "K") {
          //This logic is for castling when we get payload.piece to be WHITE KING
          if (san === "O-O") {
            arr.push({ from: payload.from, to: "g1", promoOptions: [] });
          }
          if (san === "O-O-O") {
            arr.push({ from: payload.from, to: "c1", promoOptions: [] });
          }
          arr.push({
            from: payload.from,
            to: sanitizePos(san),
            promoOptions: [],
          });
        } else if (san.includes("=")) {
          if (payload.piece === "p") {
            arr.push({
              from: payload.from,
              to: sanitizePos(san),
              promoOptions: ["q", "b", "r", "n"],
            });
          }
          if (payload.piece === "P") {
            arr.push({
              from: payload.from,
              to: sanitizePos(san),
              promoOptions: ["Q", "B", "R", "N"],
            });
          }
        } else
          arr.push({
            from: payload.from,
            to: sanitizePos(san),
            promoOptions: [],
          });
      });
      console.log(sanArray);
      console.log(arr);
      state.availableMoves = filterRedundantObject(arr);
    },

    resetAvailableMoves: (state) => {
      state.availableMoves = [];
    },

    move: (state, { payload }: { payload: MovePayloadType }) => {
      const chess = new Chess(state.fen);

      chess.move({
        from: payload.from,
        to: payload.to,
        promotion: payload.promotion.toLowerCase(),
      });
      state.fen = chess.fen();
      state.turn = chess.turn();
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
      state.turn = "w";
      state.availableMoves = [];
      state.check = {
        isCheck: false,
        king: "",
      };
      state.endingGame = {
        endedBy: "",
      };
    },

    promoMove: (state, { payload }: { payload: MoveType }) => {
      state.showPromoMove = payload;
    },

    resetPromoMove: (state) => {
      state.showPromoMove = "";
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
  promoMove,
  resetPromoMove,
} = chessSlice.actions;
export default chessSlice.reducer;
