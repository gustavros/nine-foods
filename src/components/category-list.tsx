import { db } from "@/lib/prisma";
import CategoryItem from "./category-item";

export default async function CategoryList() {
  const categories = await db.category.findMany({});

  return (
    <div className=" flex items-center gap-3 overflow-x-scroll">
      {categories.map((category) => (
        <CategoryItem key={category.id} category={category} />
      ))}
    </div>
  );
}
