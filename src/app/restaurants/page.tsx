import { Suspense } from "react";
import Restaurants from "./_components/restaurants";
import { db } from "@/_lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/_lib/auth";

export default async function RestaurantsPage() {
  const session = await getServerSession(authOptions);

  const UserFavoritesRestaurants = await db.userFavoritesRestaurants.findMany({
    where: {
      userId: session?.user.id,
    },
  });

  return (
    <Suspense fallback={null}>
      <Restaurants UserFavoritesRestaurants={UserFavoritesRestaurants} />
    </Suspense>
  );
}
