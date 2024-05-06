"use client";

import Link from "next/link";
import Search from "./search";

import MenuMobile from "./menu-mobile";

export default function Header() {
  return (
    <div className="flex flex-col space-y-5 px-5">
      <div className="flex items-center justify-between pt-6">
        <Link href="/" className="font-bold">
          nine foods.
        </Link>

        <MenuMobile />
      </div>

      <Search />
    </div>
  );
}
