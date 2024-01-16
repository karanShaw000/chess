import { Square, SQUARES as positions } from "chess.js";
export type CellType = {
  pos: Square;
  piece: string;
};

//This function will retun an array from 0 to n
const range = (n: number) =>
  Array.from({ length: n }, (_, index) => `${index + 1}`);

export default function createBoard(fen: string) {
  const fenString = fen.split(" ")[0];
  const fenPieces = fenString.split("/").join("");

  let pieces: string[] | string[][] = Array.from(fenPieces);

  Array.from(fenPieces).forEach((item, index) => {
    if (isFinite(Number(item))) {
      pieces.splice(index, 1, range(Number(item)).fill(""));
    }
  });

  pieces = pieces.flat();

  const board: CellType[] = [];

  pieces.map((piece, index) =>
    board.push({ pos: positions[index], piece: piece as string })
  );

  return board;
}
