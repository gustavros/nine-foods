"use server";

import { db } from "@/_lib/prisma";

export default async function searchForProducts(search: string) {
  const products = await db.product.findMany({
    include: {
      restaurant: true,
    },
    where: {
      name: {
        contains: search,
        mode: "insensitive",
      },
    },
  });

  return products;
}
