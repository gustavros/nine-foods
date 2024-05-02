import Header from "@/components/header";
import HeartButton from "@/components/heart-button";
import StarBadge from "@/components/star-badge";
import { formatCurrency } from "@/helpers/price";
import { db } from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";

interface RecommendedRestaurantsProps {}

export default async function RecommendedRestaurants({}: RecommendedRestaurantsProps) {
  const restaurants = await db.restaurant.findMany({
    orderBy: {
      stars: "desc",
    },
    include: {
      categories: true,
    },
  });

  return (
    <>
      <Header />

      <div className="p-5">
        <h2 className="mb-6 text-lg font-semibold">
          Restaurantes recomendados
        </h2>

        <div className="flex w-full flex-col gap-3">
          {restaurants.map((restaurant) => (
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
          ))}
        </div>
      </div>
    </>
  );
}
