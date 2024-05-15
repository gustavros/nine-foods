"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/_components/ui/avatar";
import { Button } from "@/_components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/_components/ui/dropdown-menu";

import { signOut, useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export function DashboardUser() {
  const { data } = useSession();

  const isGustavo = data?.user.email === "gustavossw1@gmail.com" ? true : false;

  if (isGustavo === false) {
    redirect("/");
  }

  function handleSignOut() {
    return signOut();
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="overflow-hidden rounded-full"
        >
          <Avatar>
            <AvatarImage src={data?.user?.image || ""} />

            <AvatarFallback>
              {data?.user?.name ? data.user.name[0] : ""}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Minha conta</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem disabled>Configurações</DropdownMenuItem>
        <DropdownMenuItem disabled>Suporte</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="cursor-pointer text-red-400"
          onClick={handleSignOut}
        >
          Sair
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
