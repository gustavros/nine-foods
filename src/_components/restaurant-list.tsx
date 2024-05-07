import RestaurantItem from "./restaurant-item";

import { Carousel, CarouselContent } from "@/_components/ui/carousel";
import { authOptions } from "@/_lib/auth";
import { db } from "@/_lib/prisma";
import { getServerSession } from "next-auth";

interface RestaurantListProps {
  className?: string;
}

export default async function RestaurantList({}: RestaurantListProps) {
  const session = await getServerSession(authOptions);

  const restaurants = await db.restaurant.findMany({
    take: 10,
    orderBy: {
      stars: "desc",
    },
  });

  const userFavoritedRestaurants = await db.userFavoritesRestaurants.findMany({
    where: {
      userId: session?.user.id,
    },
  });

  return (
    <Carousel>
      <CarouselContent className="-ml-0 flex gap-4 pb-2">
        {restaurants.map((restaurant) => (
          <RestaurantItem
            key={restaurant.id}
            restaurant={restaurant}
            userId={session?.user.id}
            userFavoritedRestaurants={userFavoritedRestaurants}
          />
        ))}
      </CarouselContent>
    </Carousel>
  );
}
