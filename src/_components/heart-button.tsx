import { HeartIcon } from "lucide-react";
import { Button } from "./ui/button";
import { cn } from "@/_lib/utils";

interface HeartButtonProps {
  className?: string;
}

export default function HeartButton({ className }: HeartButtonProps) {
  return (
    <Button
      size={"icon"}
      className={cn("group  h-7 w-7 rounded-full px-1", className)}
    >
      <HeartIcon size={16} className="h-fit w-fit group-hover:fill-current" />
    </Button>
  );
}
