"use client";

import { useDispatch, useSelector } from "react-redux";

import { HeartIcon } from "@/shared/components/icons/svgIcons";
import { cn } from "@/shared/utils/styling";
import type { RootState } from "@/store/shoppingCart";
import { toggleFavorite } from "@/store/shoppingCart";

type TProps = {
  productId: string;
  className?: string;
  iconWidth?: number;
};

export function FavoriteToggle({ productId, className, iconWidth = 22 }: TProps) {
  const dispatch = useDispatch();
  const isFavorite = useSelector((s: RootState) => s.favorites.ids.includes(productId));

  return (
    <button
      type="button"
      aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
      aria-pressed={isFavorite}
      className={cn(
        "inline-flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-md border-none bg-white transition-colors duration-300",
        className
      )}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        dispatch(toggleFavorite(productId));
      }}
    >
      <HeartIcon
        width={iconWidth}
        strokeWidth={1}
        stroke={isFavorite ? "#eb4141" : "#9ca3af"}
        fill={isFavorite ? "#eb4141" : "white"}
        className={cn("transition-colors duration-300", isFavorite && "stroke-[#eb4141]")}
      />
    </button>
  );
}
