import ProductItem from "./product-item";

import { Carousel, CarouselContent } from "@/components/ui/carousel";
import { Prisma } from "@prisma/client";

interface ProductListProps {
  products: Prisma.ProductGetPayload<{
    include: {
      restaurant: {
        select: {
          name: true;
        };
      };
    };
  }>[];
}

export default async function ProductList({ products }: ProductListProps) {
  return (
    <Carousel className="cursor-grab">
      <CarouselContent className="-ml-0 flex gap-4 pb-2">
        {products.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </CarouselContent>
    </Carousel>
  );
}
