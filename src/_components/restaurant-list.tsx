import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/_components/ui/carousel";
import { authOptions } from "@/_lib/auth";
import { db } from "@/_lib/prisma";

import { getServerSession } from "next-auth";
import RestaurantItem from "./restaurant-item";

interface RestaurantListProps {
  className?: string;
}

export default async function RestaurantList({}: RestaurantListProps) {
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
    <Carousel>
      <CarouselContent className="-ml-0 mb-6 gap-4">
        {restaurants.map((restaurant) => (
          <CarouselItem key={restaurant.id} className="basis-3/3 pl-0">
            <RestaurantItem
              restaurant={restaurant}
              userFavoritedRestaurants={userFavoritedRestaurants}
            />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
