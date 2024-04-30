import { calculateProductTotalPrice, formatCurrency } from "@/helpers/price";
import { Prisma } from "@prisma/client";
import { ArrowDownIcon } from "lucide-react";
import Image from "next/image";

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
    <div className="w-36 min-w-36 space-y-2">
      <div className="relative h-36 w-full">
        <Image
          fill
          src={product.imageUrl}
          alt={product.name}
          className="rounded-lg object-cover shadow-md"
        />

        {product.discountPercentage && (
          <div className="absolute left-2 top-2 flex items-center gap-0.5 rounded-full bg-red-600 px-2 py-0.5 text-accent-foreground text-white">
            <ArrowDownIcon size={16} />
            <span className="text-xs font-semibold">
              {product.discountPercentage}%
            </span>
          </div>
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
  );
}
