"use client";

import * as React from "react";
import { useTheme } from "next-themes";

import { Button } from "@/_components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/_components/ui/dropdown-menu";

import {
  EarthIcon,
  MoonIcon,
  PaletteIcon,
  SettingsIcon,
  SunIcon,
} from "lucide-react";

export function ModeToggle() {
  const { setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant={"ghost"}
          className="flex w-full items-center justify-start gap-3 "
        >
          <SettingsIcon size={16} />
          Configurações
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" alignOffset={14}>
        {/* TEMA */}

        <DropdownMenuSub>
          <DropdownMenuSubTrigger className="flex items-center gap-1">
            <PaletteIcon size={16} />
            <span>Temas</span>
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent sideOffset={8} alignOffset={-4}>
              <DropdownMenuItem
                onClick={() => setTheme("dark")}
                className="flex items-center gap-1"
              >
                <MoonIcon size={16} />

                <span>Escuro</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setTheme("light")}
                className="flex items-center gap-1"
              >
                <SunIcon size={16} />

                <span>Claro</span>
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger
            disabled
            className="flex cursor-not-allowed items-center gap-1"
          >
            <EarthIcon size={16} />
            <span>Idioma</span>
          </DropdownMenuSubTrigger>
        </DropdownMenuSub>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
