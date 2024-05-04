import { Category } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

interface CategoryItemProps {
  category: Category;
}

export default function CategoryItem({ category }: CategoryItemProps) {
  return (
    <Link
      href={`/categories/${category.id}/products`}
      className="flex w-fit min-w-fit items-center gap-3 rounded-full px-4 py-3 shadow-md dark:bg-zinc-950/30"
    >
      <Image
        src={category.imageUrl}
        alt={category.name}
        width={30}
        height={30}
      />

      <span className="text-sm font-semibold">{category.name}</span>
    </Link>
  );
}
