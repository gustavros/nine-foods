import { formatCurrency } from "@/helpers/price";
import { Restaurant } from "@prisma/client";
import { BikeIcon, HeartIcon, StarIcon, TimerIcon } from "lucide-react";
import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";

interface RestaurantItemProps {
  restaurant: Restaurant;
}

export default function RestaurantItem({ restaurant }: RestaurantItemProps) {
  return (
    <Link href={`/restaurants/${restaurant.id}`}>
      <div className="min-w-64 max-w-64 space-y-3">
        <div className="relative h-36 w-full ">
          <Image
            src={restaurant.imageUrl}
            alt={restaurant.name}
            className="rounded-lg object-cover"
            fill
          />

          <div className="absolute left-2 top-2 flex items-center gap-0.5 rounded-full px-2 py-0.5 text-accent-foreground dark:border-accent dark:bg-transparent ">
            <StarIcon size={16} className="fill-yellow-400 text-yellow-400" />

            <span className="text-xs font-semibold">
              {Number(restaurant.stars).toFixed(1)}
            </span>
          </div>

          <Button
            size={"icon"}
            className="absolute right-2 top-2 h-7 w-7 rounded-full bg-muted-foreground px-1"
          >
            <HeartIcon
              size={16}
              className="h-fit w-fit transition-all hover:fill-white"
            />
          </Button>
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
    </Link>
  );
}
