import { MenuIcon } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";

export default function Header() {
  return (
    <div className="flex items-center justify-between px-5 pt-6">
      <Link href="/" className="font-bold">
        nine foods.
      </Link>

      <Button size="icon" variant="ghost">
        <MenuIcon />
      </Button>
    </div>
  );
}
