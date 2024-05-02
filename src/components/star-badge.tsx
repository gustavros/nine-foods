import { Restaurant } from "@prisma/client";
import { StarIcon } from "lucide-react";

interface StarBadgeProps {
  restaurant: Pick<Restaurant, "stars">;
}

export default function StarBadge({ restaurant }: StarBadgeProps) {
  return (
    <div className=" flex items-center gap-0.5 rounded-full bg-accent px-2 py-0.5 text-accent-foreground dark:border-accent">
      <StarIcon size={16} className="fill-yellow-400 text-yellow-400" />

      <span className="text-xs font-semibold">
        {Number(restaurant.stars).toFixed(1)}
      </span>
    </div>
  );
}
