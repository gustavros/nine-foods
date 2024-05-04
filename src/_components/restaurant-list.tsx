import RestaurantItem from "./restaurant-item";

import { Carousel, CarouselContent } from "@/_components/ui/carousel";
import { db } from "@/_lib/prisma";

export default async function RestaurantList() {
  const restaurants = await db.restaurant.findMany({
    take: 10,
    orderBy: {
      stars: "desc",
    },
  });

  return (
    <Carousel>
      <CarouselContent className="-ml-0 flex gap-4 pb-2">
        {restaurants.map((restaurant) => (
          <RestaurantItem key={restaurant.id} restaurant={restaurant} />
        ))}
      </CarouselContent>
    </Carousel>
  );
}
