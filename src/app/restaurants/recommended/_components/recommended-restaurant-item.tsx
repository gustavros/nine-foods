import { Prisma, UserFavoritesRestaurants } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { formatCurrency } from "@/_helpers/price";
import StarBadge from "@/_components/star-badge";
import HeartButton from "@/_components/heart-button";
import { cn } from "@/_lib/utils";

interface RecommendedRestaurantItemProps {
  restaurant: Prisma.RestaurantGetPayload<{
    include: {
      categories: true;
    };
  }>;
  userFavoritedRestaurants: UserFavoritesRestaurants[];
  className?: string;
}

export default function RecommendedRestaurantItem({
  restaurant,
  userFavoritedRestaurants,
  className,
}: RecommendedRestaurantItemProps) {
  return (
    <div
      key={restaurant.id}
      className={cn(
        "relative flex w-full gap-6 rounded-lg border border-muted px-4 py-4",
        className,
      )}
    >
      <Link href={`/restaurants/${restaurant.id}`}>
        <div className="relative h-24 w-24">
          <Image
            src={restaurant.imageUrl}
            alt={restaurant.name}
            className="rounded-lg object-cover"
            fill
          />
        </div>
      </Link>

      <HeartButton
        restaurant={restaurant}
        className="absolute left-2 top-2"
        userFavoritedRestaurants={userFavoritedRestaurants}
      />

      <Link href={`/restaurants/${restaurant.id}`}>
        <h3 className="truncate text-base font-semibold">{restaurant.name}</h3>

        <div className="flex items-center gap-1">
          <div className="flex items-center gap-1.5">
            <span className="text-xs text-muted-foreground">
              {Number(restaurant.deliveryFee) === 0
                ? "Entrega grátis"
                : formatCurrency(Number(restaurant.deliveryFee))}
            </span>
          </div>

          <p className="text-xs text-muted">•</p>

          <div className="flex items-center gap-1.5">
            <span className="text-xs text-muted-foreground">
              {restaurant.deliveryTimeMinutes} min
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <StarBadge className="px-0" restaurant={restaurant} />-
          {restaurant.categories
            .map((category) => (
              <span className="block text-sm" key={category.id}>
                {category.name}
              </span>
            ))
            .at(2)}
        </div>
      </Link>
    </div>
  );
}
