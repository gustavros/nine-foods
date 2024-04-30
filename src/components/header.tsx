import { MenuIcon } from "lucide-react";
import { Button } from "./ui/button";

export default function Header() {
  return (
    <div className="flex items-center justify-between px-5 pt-6">
      <h1 className="font-bold">ifood.</h1>
      <Button size="icon" variant="ghost">
        <MenuIcon />
      </Button>
    </div>
  );
}
