import { useDispatch } from "react-redux";
import { moves } from "../../store/chess/chessSlice";
import { Square } from "chess.js";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

interface PieceProps {
  piece: string;
  pos: Square;
}

const Piece = ({ piece, pos }: PieceProps) => {
  const check = useSelector((s: RootState) => s.chessGame.check);
  const dispatch = useDispatch();
  const showAvailableMovesHandler = () => {
    dispatch(moves({ piece, from: pos }));
  };
  if (piece === "") return "";

  return (
    <img
      src={`/assets/pieces/${piece}.png`}
      onClick={showAvailableMovesHandler}
      className={`${
        check.isCheck && piece === check.king ? "bg-red-600" : ""
      } w-full h-full`}
    />
  );
};

export default Piece;
