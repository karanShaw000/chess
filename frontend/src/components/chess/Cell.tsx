import { useSelector } from "react-redux";
import { CellType } from "../../utils/create-board";
import isLightCell from "../../utils/isLightCell";
import Piece from "./Piece";
import { RootState } from "../../store";
import AvailablePiece from "./AvailablePiece";

interface CellProps {
  index: number;
  cell: CellType;
}

const light: string = "bg-[rgb(204,183,174)]";
const dark: string = "bg-[rgb(112,102,119)]";

const Cell = ({ index, cell }: CellProps) => {
  const isLight = isLightCell(cell.pos, index);
  const availableMoves = useSelector(
    (state: RootState) => state.chessGame.availableMoves
  );
  // console.log(availableMoves);

  // console.log(
  //   availableMoves.map(
  //     (pos) => pos[pos.search(/[a-z]\d/g)] + pos[pos.search(/[a-z]\d/g) + 1]
  //   )
  // );

  return (
    <div className={`${isLight ? light : dark} relative`}>
      <p className="absolute top-0 left-0">{cell.pos}</p>
      {availableMoves.map((moveObj, index) => {
        //sanitize pos logic should be written in reducer and add more logic to casting + check
        if (moveObj.to === cell.pos) {
          return (
            <AvailablePiece
              key={index}
              from={moveObj.from}
              to={moveObj.to}
              promoOptions={moveObj.promoOptions}
            />
          );
        }
      })}
      {<Piece piece={cell.piece} pos={cell.pos} />}
    </div>
  );
};

export default Cell;
