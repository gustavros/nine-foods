"use server";

import { db } from "@/_lib/prisma";
import { Prisma } from "@prisma/client";

export async function createProduct(data: Prisma.ProductCreateInput) {
  await db.product.create({
    data,
  });
}
