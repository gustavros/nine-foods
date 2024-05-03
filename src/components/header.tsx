import { MenuIcon } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";
import Search from "./search";

export default function Header() {
  return (
    <div className="flex flex-col space-y-5 px-5">
      <div className="flex items-center justify-between pt-6">
        <Link href="/" className="font-bold">
          nine foods.
        </Link>

        <Button size="icon" variant="ghost">
          <MenuIcon />
        </Button>
      </div>

      <Search />
    </div>
  );
}
