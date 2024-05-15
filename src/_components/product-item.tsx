"use client";

import { calculateProductTotalPrice, formatCurrency } from "@/_helpers/price";
import Image from "next/image";
import Link from "next/link";
import DiscountBadge from "./discount-badge";
import { cn } from "@/_lib/utils";
import { Product } from "@prisma/client";

interface ProductItemProps {
  product: Product;
  className?: string;
}

export default function ProductItem({ product, className }: ProductItemProps) {
  return (
    <Link href={`/products/${product.id}`} className={cn("w-36", className)}>
      <div className="space-y-2">
        <div className="relative h-36 w-36">
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

            {product.discountPercentage > 0 && (
              <span className="text-sm text-muted-foreground line-through">
                {formatCurrency(Number(product.price))}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
