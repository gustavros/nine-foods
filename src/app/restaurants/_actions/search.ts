"use server";

import { db } from "@/lib/prisma";

export default async function searchForRestaurants(search: string) {
  const restaurants = await db.restaurant.findMany({
    include: {
      categories: true,
    },
    where: {
      name: {
        contains: search,
        mode: "insensitive",
      },
    },
  });

  return restaurants;
}
