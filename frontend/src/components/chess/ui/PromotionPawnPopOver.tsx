import { Popover, PopoverContent } from "@/components/ui/popover";
import { PopoverAnchor } from "@radix-ui/react-popover";
import { move, resetPromoMove } from "@/store/chess/chessSlice";

import { Square } from "chess.js";
import { useState } from "react";
import { useDispatch } from "react-redux";

interface PromotionPawnPopOverType {
  show: boolean;
  promoOption: ["Q", "B", "R", "N"] | ["q", "b", "r", "n"] | [];
  from: Square;
  to: string;
}

const PromotionPawnPopOver = ({
  show,
  promoOption,
  to,
  from,
}: PromotionPawnPopOverType) => {
  const [open, setOpen] = useState(show);
  const dispatch = useDispatch();
  const movePromotionPieceHandler = (
    p: "Q" | "B" | "R" | "N" | "q" | "b" | "r" | "n"
  ) => {
    setOpen(false);
    dispatch(move({ to, from, promotion: p }));
    dispatch(resetPromoMove());
  };

  const onOpenChangeHandler = () => {
    setOpen(false);
    dispatch(resetPromoMove());
  };
  return (
    <Popover open={open} onOpenChange={onOpenChangeHandler} modal={false}>
      <PopoverAnchor />
      <PopoverContent className="flex justify-start items-center gap-2">
        {promoOption.map((p) => (
          <img
            className="w-1/2 cursor-pointer"
            key={p}
            src={`/public/assets/pieces/${p}.png`}
            onClick={() => movePromotionPieceHandler(p)}
          />
        ))}
      </PopoverContent>
    </Popover>
  );
};

export default PromotionPawnPopOver;
