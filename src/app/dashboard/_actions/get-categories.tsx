"use server";

import { db } from "@/_lib/prisma";

export async function getCategories() {
  const categories = await db.category.findMany({});

  return categories;
}
