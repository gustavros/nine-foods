"use client";

import Image from "next/image";
import { Button } from "./ui/button";
import { ChevronLeftIcon } from "lucide-react";
import { Product } from "@prisma/client";
import { useRouter } from "next/navigation";

interface ProductImageProps {
  product: Pick<Product, "name" | "imageUrl">;
}

export default function ProductImage({ product }: ProductImageProps) {
  const router = useRouter();

  function handleBackClick() {
    router.back();
  }

  return (
    <div className="relative h-96 w-full">
      <Image
        src={product.imageUrl}
        alt={product.name}
        className="object-cover"
        fill
      />
      <Button
        variant={"outline"}
        className="absolute left-2 top-2 rounded-full"
        size={"icon"}
        onClick={handleBackClick}
      >
        <ChevronLeftIcon size={16} />
      </Button>
    </div>
  );
}
