"use server";

import { db } from "@/_lib/prisma";

export async function getProductsByRestaurantId(restaurantId: string) {
  const restaurants = await db.product.findMany({
    where: {
      restaurantId,
    },
  });

  return restaurants;
}
