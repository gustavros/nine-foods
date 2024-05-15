"use server";

import { db } from "@/_lib/prisma";

export async function getProducts() {
  const products = await db.product.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return products;
}
