import { Square } from "chess.js";

export type ChessType = {
  move: (fromPos: string, toPos: string) => void;
  moves: (cell: Square) => Array<string>;
};
