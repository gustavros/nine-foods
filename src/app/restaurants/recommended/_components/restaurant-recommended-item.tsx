import { Prisma } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import HeartButton from "@/_components/heart-button";
import { formatCurrency } from "@/_helpers/price";
import StarBadge from "@/_components/star-badge";

interface RestaurantRecommendedItemProps {
  restaurant: Prisma.RestaurantGetPayload<{
    include: {
      categories: true;
    };
  }>;
}

export default function RestaurantRecommendedItem({
  restaurant,
}: RestaurantRecommendedItemProps) {
  return (
    <Link
      href={`/restaurants/${restaurant.id}`}
      key={restaurant.id}
      className="relative flex gap-6 rounded-lg border border-muted px-4 py-4"
    >
      <div className="relative h-24 w-24  ">
        <Image
          src={restaurant.imageUrl}
          alt={restaurant.name}
          className="rounded-lg object-cover"
          fill
        />

        <HeartButton />
      </div>

      <div>
        <h3 className="text-base font-semibold">{restaurant.name}</h3>

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

        {restaurant.categories
          .map((category) => (
            <span className="block text-sm" key={category.id}>
              {category.name}
            </span>
          ))
          .at(2)}
      </div>

      <StarBadge
        restaurant={restaurant}
        className="absolute right-4 top-4 bg-transparent p-0 text-xs"
      />
    </Link>
  );
}
