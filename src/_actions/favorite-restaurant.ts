"use server";

import { db } from "@/_lib/prisma";
import { revalidatePath } from "next/cache";

export async function favoriteRestaurant(userId: string, restaurantId: string) {
  await db.userFavoritesRestaurants.create({
    data: {
      userId,
      restaurantId,
    },
  });

  revalidatePath("/");
}

export async function unfavoriteRestaurant(
  userId: string,
  restaurantId: string,
) {
  await db.userFavoritesRestaurants.delete({
    where: {
      userId_restaurantId: {
        userId,
        restaurantId,
      },
    },
  });

  revalidatePath("/");
}
