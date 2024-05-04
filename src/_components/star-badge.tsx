import { cn } from "@/_lib/utils";
import { Restaurant } from "@prisma/client";
import { StarIcon } from "lucide-react";

interface StarBadgeProps {
  restaurant: Pick<Restaurant, "stars">;
  className?: string;
}

export default function StarBadge({ restaurant, className }: StarBadgeProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-0.5 rounded-full bg-background px-2 py-0.5 text-accent-foreground dark:border-accent",
        className,
      )}
    >
      <StarIcon size={16} className="fill-yellow-400 text-yellow-400" />

      <span className="text-xs font-semibold">
        {Number(restaurant.stars).toFixed(1)}
      </span>
    </div>
  );
}
