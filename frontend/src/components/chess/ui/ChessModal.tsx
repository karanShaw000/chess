import { Dialog, DialogFooter, DialogContent } from "@/components/ui/dialog";
import { Button } from "../../ui/button";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { resetGame } from "@/store/chess/chessSlice";

type ChessModalType = {
  show: boolean;
  pngSrc: string;
  endedBy: "Checkmate" | "Stalemate";
  result: string;
};

const ChessModal = ({ show, pngSrc, endedBy, result }: ChessModalType) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(show);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="bg-[rgb(112,102,119)]">
        <div className="flex flex-col justify-center items-center gap-1 ">
          <img src={pngSrc} alt="chess-result-png" />

          <p className="text-xl font-bold">{result}</p>
          <p className="text-xl font-bold">{`By ${endedBy}`}</p>
        </div>

        <DialogFooter>
          <Button
            className="w-full bg-primary text-secondary"
            onClick={() => dispatch(resetGame())}
          >
            Reset Game
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ChessModal;
