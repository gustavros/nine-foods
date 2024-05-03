import Header from "@/components/header";
import RestaurantRecommendedItem from "@/components/restaurant-recommended-item";
import { db } from "@/lib/prisma";

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
            <RestaurantRecommendedItem
              restaurant={restaurant}
              key={restaurant.id}
            />
          ))}
        </div>
      </div>
    </>
  );
}
