import ProductItem from "./product-item";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/_components/ui/carousel";
import { Product } from "@prisma/client";

interface ProductListProps {
  products: Product[];
}

export default function ProductList({ products }: ProductListProps) {
  return (
    <Carousel>
      <CarouselContent className="-ml-0 mb-6 gap-4">
        {products.map((product) => (
          <CarouselItem key={product.id} className="basis-3/3 pl-0">
            <ProductItem product={product} />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
