// import { CellType } from "../utils/create-board";
import { useSelector } from "react-redux";
import Cell from "./Cell";
import { RootState } from "../../store";
import { useEffect, useState } from "react";
import createBoard from "../../utils/create-board";
import { useDispatch } from "react-redux";
import { isCheck, isGameOver, resetGame } from "../../store/chess/chessSlice";
import ChessModal from "./ChessModal";
import { RefreshCcw } from "lucide-react";

// interface BoardProps {
//   board: CellType[];
// }

const Board = () => {
  const fen = useSelector((state: RootState) => state.chessGame.fen);
  const endingGame = useSelector(
    (state: RootState) => state.chessGame.endingGame
  );
  const dispatch = useDispatch();
  const [board, setBoard] = useState(createBoard(fen));

  useEffect(() => {
    console.log(fen, "<<<<<<FEN>>>>>");
    dispatch(isGameOver());
    if (endingGame.endedBy === "checkmate") {
      console.log(endingGame.endedBy);
      console.log(`${endingGame.color} wins`);
    } else if (endingGame.endedBy === "stalemate") {
      console.log(endingGame.endedBy);
    } else {
      setBoard(createBoard(fen));
    }
    dispatch(isCheck());
  }, [fen, dispatch, endingGame]);

  return (
    <div>
      {endingGame.endedBy === "checkmate" && (
        <ChessModal
          pngSrc={`${
            endingGame.color === "b"
              ? "/public/assets/game-result/bWin.png"
              : "/public/assets/game-result/wWin.png"
          }`}
          show={true}
          result={`${endingGame.color === "b" ? "Black" : "White"} Wins`}
          endedBy="Checkmate"
        />
      )}
      {endingGame.endedBy === "stalemate" && (
        <ChessModal
          pngSrc={`/public/assets/game-result/draw.png`}
          show={true}
          result={`Draw`}
          endedBy="Stalemate"
        />
      )}
      <div className="flex justify-start items-start gap-2">
        <div
          id="board"
          className={`grid grid-cols-8 grid-rows-8  bg-blue-950 rounded-md shadow-xl p-2`}
        >
          {board.map((cell, index) => (
            <Cell index={index} cell={cell} key={cell.pos} />
          ))}
        </div>
        {endingGame.endedBy !== "" && (
          <RefreshCcw
            size={50}
            className="cursor-pointer"
            onClick={() => dispatch(resetGame())}
          />
        )}
      </div>
    </div>
  );
};

export default Board;
