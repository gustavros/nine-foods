import Header from "@/_components/header";
import RestaurantRecommendedItem from "@/app/restaurants/recommended/_components/recommended-restaurant-item";
import { db } from "@/_lib/prisma";

export default async function RecommendedRestaurants() {
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
