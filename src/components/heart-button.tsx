import { HeartIcon } from "lucide-react";
import { Button } from "./ui/button";

interface HeartButtonProps extends React.ComponentProps<typeof Button> {}

export default function HeartButton({ ...props }: HeartButtonProps) {
  return (
    <Button
      {...props}
      size={"icon"}
      className="group absolute left-2 top-2 h-7 w-7 rounded-full px-1"
    >
      <HeartIcon size={16} className="h-fit w-fit group-hover:fill-current" />
    </Button>
  );
}
