import { useDispatch } from "react-redux";

import { Square } from "chess.js";
import { move, promoMove } from "../../store/chess/chessSlice";

type AvailablePieceProps = {
  from: Square;
  to: string;
  promoOptions: ["Q", "B", "R", "N"] | ["q", "b", "r", "n"] | [];
};

const AvailablePiece = ({ from, to, promoOptions }: AvailablePieceProps) => {
  const dispatch = useDispatch();
  const movePieceHandler = () => {
    if (promoOptions.length === 0) {
      dispatch(move({ from: from, to: to, promotion: "" }));
    } else {
      dispatch(promoMove({ from: from, to: to, promoOptions: promoOptions }));
    }
  };
  return (
    <>
      <div
        className="w-full h-full flex items-center justify-center absolute top-0 left-0"
        onClick={movePieceHandler}
      >
        <div className="aspect-square w-1/4   rounded-full border-black bg-green-900 blur-sm"></div>
      </div>
    </>
  );
};

export default AvailablePiece;
