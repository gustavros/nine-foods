import { formatCurrency } from "@/_helpers/price";
import { Restaurant } from "@prisma/client";
import { BikeIcon, TimerIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/_lib/utils";

interface RestaurantItemProps {
  restaurant: Restaurant;
  className?: string;
}

export default function RestaurantItem({
  restaurant,
  className,
}: RestaurantItemProps) {
  return (
    <div>
      <div className={cn("min-w-64 max-w-64 space-y-3", className)}>
        <div className="relative h-36 w-full">
          <Link href={`/restaurants/${restaurant.id}`}>
            <Image
              src={restaurant.imageUrl}
              alt={restaurant.name}
              className="rounded-lg object-cover"
              fill
            />
          </Link>
        </div>

        <div>
          <h3 className="text-sm font-semibold">{restaurant.name}</h3>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <BikeIcon size={16} className="text-primary" />

              <span className="text-xs text-muted-foreground">
                {Number(restaurant.deliveryFee) === 0
                  ? "Entrega grátis"
                  : formatCurrency(Number(restaurant.deliveryFee))}
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              <TimerIcon size={16} className="text-primary" />

              <span className="text-xs text-muted-foreground">
                {restaurant.deliveryTimeMinutes} min
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
