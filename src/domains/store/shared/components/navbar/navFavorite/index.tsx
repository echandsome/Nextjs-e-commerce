"use client";

import Link from "next/link";
import { useSelector } from "react-redux";

import { HeartIcon } from "@/shared/components/icons/svgIcons";
import type { RootState } from "@/store/shoppingCart";

const NavBarFavorite = () => {
  const count = useSelector((s: RootState) => s.favorites.ids.length);

  return (
    <Link
      href="/favorites"
      className="relative ml-5 flex cursor-pointer items-center stroke-gray-500 hover:stroke-gray-800 sm:ml-7 md:ml-4"
      aria-label={`Favorites${count > 0 ? `, ${count} items` : ""}`}
    >
      <HeartIcon width={20} className="fill-white stroke-inherit transition-all duration-200" />
      {count > 0 ? (
        <span className="absolute -right-4 -top-0.5 flex size-6 items-center justify-center rounded-full bg-gray-300 text-center text-sm leading-6">
          {count > 99 ? "99+" : count}
        </span>
      ) : null}
    </Link>
  );
};

export default NavBarFavorite;
