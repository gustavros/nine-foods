import Header from "@/_components/header";
import RestaurantRecommendedItem from "@/app/restaurants/recommended/_components/recommended-restaurant-item";
import { db } from "@/_lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/_lib/auth";

export default async function RecommendedRestaurants() {
  const session = await getServerSession(authOptions);

  const restaurants = await db.restaurant.findMany({
    orderBy: {
      stars: "desc",
    },
    include: {
      categories: true,
    },
  });

  const userFavoritedRestaurants = await db.userFavoritesRestaurants.findMany({
    where: {
      userId: session?.user.id,
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
              userFavoritedRestaurants={userFavoritedRestaurants}
            />
          ))}
        </div>
      </div>
    </>
  );
}
