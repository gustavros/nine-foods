import Header from "@/_components/header";
import ProductItem from "@/_components/product-item";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationLink,
  PaginationNext,
} from "@/_components/ui/pagination";

import { db } from "@/_lib/prisma";
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
          <div className="flex flex-wrap justify-center gap-6">
            {category.products.map((product) => (
              <ProductItem key={product.id} product={product} />
            ))}
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
