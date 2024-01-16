//Not using this code now

export default function castling(moves: Array<string>, king: string) {
  const queenCastle = king === "K" ? "c1" : "c8";
  const kingCastle = king === "K" ? "q1" : "q8";
  if (moves.includes("O-O-O") || moves.includes("O-O")) {
    if (moves.includes("O-O-O") && moves.includes("O-O")) {
      const queenIndex = moves.indexOf("O-O-O");
      const kingIndex = moves.indexOf("O-O");
      moves.splice(queenIndex, 1, queenCastle);
      moves.splice(kingIndex, 1, kingCastle);
    } else if (moves.includes("O-O-O")) {
      const index = moves.indexOf("O-O-O");
      moves.splice(index, 1, queenCastle);
    } else {
      const index = moves.indexOf("O-O");
      moves.splice(index, 1, kingCastle);
    }
  }
  return moves;
}
