"use client";

import { calculateProductTotalPrice, formatCurrency } from "@/helpers/price";
import { Prisma } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import DiscountBadge from "./discount-badge";

interface ProductItemProps {
  product: Prisma.ProductGetPayload<{
    include: {
      restaurant: {
        select: {
          name: true;
        };
      };
    };
  }>;
}

export default function ProductItem({ product }: ProductItemProps) {
  return (
    <Link href={`/products/${product.id}`} className="w-36 min-w-36">
      <div className="space-y-2">
        <div className="relative h-36 w-full cursor-pointer">
          <Image
            fill
            src={product.imageUrl}
            alt={product.name}
            className="rounded-lg object-cover shadow-md"
          />

          {product.discountPercentage && (
            <DiscountBadge
              product={product}
              className="absolute left-2 top-2"
            />
          )}
        </div>

        <div>
          <h2 className="truncate text-sm">{product.name}</h2>

          <div className="flex items-center gap-2">
            <span className="font-semibold">
              {formatCurrency(calculateProductTotalPrice(product))}
            </span>

            <span className="text-sm text-muted-foreground line-through">
              {formatCurrency(Number(product.price))}
            </span>
          </div>

          <span className="block text-sm text-muted-foreground">
            {product.restaurant.name}
          </span>
        </div>
      </div>
    </Link>
  );
}
