import { cn } from "@/_lib/utils";
import { Product } from "@prisma/client";
import { ArrowDownIcon } from "lucide-react";

interface DiscountBadgeProps {
  product: Pick<Product, "discountPercentage">;
  className?: string;
}

export default function DiscountBadge({
  product,
  className,
}: DiscountBadgeProps) {
  return (
    <div
      className={cn(
        "flex w-fit items-center gap-1 rounded-full bg-red-500 px-2 py-0.5 text-accent-foreground text-white dark:border-accent",
        className,
      )}
    >
      <ArrowDownIcon size={16} />

      <span className="text-xs font-semibold">
        {product.discountPercentage}%
      </span>
    </div>
  );
}
