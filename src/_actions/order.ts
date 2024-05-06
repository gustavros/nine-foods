"use server";

import { db } from "@/_lib/prisma";
import { Prisma } from "@prisma/client";

export default async function createOrder(data: Prisma.OrderCreateInput) {
  return await db.order.create({
    data,
  });
}
