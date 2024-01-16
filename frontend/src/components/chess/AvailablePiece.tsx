import { useDispatch } from "react-redux";

import { Square } from "chess.js";
import { move } from "../../store/chess/chessSlice";

type AvailablePieceProps = {
  from: Square;
  to: string;
};

const AvailablePiece = ({ from, to }: AvailablePieceProps) => {
  const dispatch = useDispatch();
  return (
    <>
      <div
        className="w-full h-full flex items-center justify-center absolute top-0 left-0"
        onClick={() => dispatch(move({ from, to }))}
      >
        <div className="aspect-square w-1/4   rounded-full border-black bg-green-900 blur-sm"></div>
      </div>
    </>
  );
};

export default AvailablePiece;
