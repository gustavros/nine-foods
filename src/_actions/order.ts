"use server";

import { db } from "@/_lib/prisma";
import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";

export default async function createOrder(data: Prisma.OrderCreateInput) {
  await db.order.create({
    data,
  });

  revalidatePath("/my-orders");
}
