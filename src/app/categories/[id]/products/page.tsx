import Header from "@/components/header";
import ProductItem from "@/components/product-item";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationLink,
  PaginationNext,
} from "@/components/ui/pagination";

import { db } from "@/lib/prisma";
import { notFound } from "next/navigation";

interface CategoriesPageProps {
  params: {
    id: string;
  };
}

export default async function CategoriesPage({
  params: { id },
}: CategoriesPageProps) {
  const category = await db.category.findUnique({
    where: {
      id: id,
    },
    include: {
      products: {
        include: {
          restaurant: true,
        },
      },
    },
  });

  if (!category) {
    return notFound();
  }

  return (
    <>
      <Header />

      <div className="px-5 py-6">
        <h2 className="mb-6 text-lg font-semibold">{category.name}</h2>

        <div>
          <div className="grid grid-cols-2 gap-6">
            {category.products
              .map((product) => (
                <ProductItem
                  key={product.id}
                  product={product}
                  className="min-w-full"
                />
              ))
              .slice(0, 6)}
          </div>

          <Pagination className="w-full py-4">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">1</PaginationLink>
              </PaginationItem>
              <PaginationItem>{/* <PaginationEllipsis /> */}</PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </>
  );
}