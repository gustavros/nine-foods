import Header from "@/_components/header";
import { authOptions } from "@/_lib/auth";
import { db } from "@/_lib/prisma";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import RecommendedRestaurantItem from "../restaurants/recommended/_components/recommended-restaurant-item";

export default async function MyFavoriteRestaurants() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return redirect("/");
  }

  const userFavoritedRestaurants = await db.userFavoritesRestaurants.findMany({
    where: {
      userId: session?.user.id,
    },
    include: {
      restaurant: {
        include: {
          categories: true,
        },
      },
    },
  });

  return (
    <>
      <Header />

      <div className="flex flex-col gap-6 px-5 py-6">
        <h1 className="text-lg font-semibold">Meus restaurantes favoritos</h1>

        <div className="space-y-3">
          {userFavoritedRestaurants.length === 0 ? (
            <div className="flex flex-col gap-2">
              <p className="text-sm text-muted-foreground">
                Nenhum restaurante favoritado. Clique {""}
                <a className=" underline " href="restaurants/recommended">
                  aqui
                </a>
                {""} para ver os restaurantes recomendados.
              </p>
            </div>
          ) : (
            userFavoritedRestaurants.map((favorite) => (
              <RecommendedRestaurantItem
                key={favorite.restaurant.id}
                restaurant={favorite.restaurant}
                userFavoritedRestaurants={userFavoritedRestaurants}
              />
            ))
          )}
        </div>
      </div>
    </>
  );
}
