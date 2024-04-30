import { SearchIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export default function Search() {
  return (
    <div className="flex">
      <Input
        type="text"
        placeholder="Buscar restaurantes..."
        className="rounded-r-none border-r-0 focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0"
      />

      <Button size={"icon"}>
        <SearchIcon size={20} />
      </Button>
    </div>
  );
}
