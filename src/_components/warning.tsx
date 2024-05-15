"use client";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
} from "@/_components/ui/alert-dialog";
import { CircleAlertIcon } from "lucide-react";

import { useState } from "react";
import { AlertDialogHeader, AlertDialogFooter } from "./ui/alert-dialog";

export function Warning() {
  const [open, setOpen] = useState(true);

  if (document.cookie.includes("next-warning=false")) {
    return null;
  }

  function handleSaveOnCookies() {
    document.cookie = `next-warning=false; path=/;`;

    setOpen(false);
  }

  function handleClose() {
    setOpen(false);

    handleSaveOnCookies();
  }

  return (
    <AlertDialog open={open}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex flex-col items-center">
            <CircleAlertIcon size={32} />

            <h2>Aviso importante</h2>
          </AlertDialogTitle>
          <AlertDialogDescription className="text-center">
            O Nine Foods agora é um aplicativo dedicado a um único restaurante.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction onClick={handleClose} className="w-full">
            Continuar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
