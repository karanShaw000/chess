// import { useEffect, useState } from "react";
// import createBoard from "../utils/create-board";

import Board from "./Board";
// import { useSelector } from "react-redux";
// import { RootState } from "../store";

// const FEN = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";

// const FEN = "rnb1kbnr/pppp1ppp/8/4p3/5PPq/8/PPPPP2P/RNBQKBNR w KQkq - 1 3";

const Game = () => {
  return (
    <div className="max-w-4xl">
      <Board />
    </div>
  );
};

export default Game;
