"use client";

import { SearchIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Search() {
  const router = useRouter();
  const [search, setSearch] = useState<string>("");

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearch(e.target.value);
  }

  function handleSearchSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!search) {
      return;
    }

    router.push(`/products?search=${search}`);
  }

  return (
    <form className="flex" onSubmit={handleSearchSubmit}>
      <Input
        type="text"
        placeholder="Buscar produtos..."
        className="rounded-r-none border-r-0 focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0"
        onChange={handleChange}
        value={search}
      />

      <Button size={"icon"} type="submit">
        <SearchIcon size={20} />
      </Button>
    </form>
  );
}
