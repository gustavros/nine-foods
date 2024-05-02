"use client";

import { formatCurrency, calculateProductTotalPrice } from "@/helpers/price";
import { Prisma } from "@prisma/client";
import Image from "next/image";
import DiscountBadge from "./discount-badge";
import {
  BikeIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  TimerIcon,
} from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import { Card } from "./ui/card";

interface ProductDetailsProps {
  product: Prisma.ProductGetPayload<{
    include: {
      restaurant: true;
    };
  }>;
}

export default function ProductDetails({ product }: ProductDetailsProps) {
  const [quantity, setQuantity] = useState(1);

  function handleIncreaseQuantity() {
    setQuantity((currentState) => currentState + 1);
  }

  function handleDecreaseQuantity() {
    if (quantity === 1) {
      return 1;
    }

    setQuantity((currentState) => currentState - 1);
  }

  return (
    <div className="p-5">
      {/* RESTAURANTE */}
      <div className="flex items-center gap-1.5">
        <div className="relative h-6 w-6">
          <Image
            src={product.restaurant.imageUrl}
            alt={product.name}
            fill
            className="rounded-full object-cover"
          />
        </div>

        <span className="text-xs text-muted-foreground">
          {product.restaurant.name}
        </span>
      </div>

      {/* NOME DO PRODUTO */}

      <h1 className="mb-3 mt-1 text-xl font-semibold ">{product.name}</h1>

      {/* PREÇO DO PRODUTO E QUANTIDADE */}
      <div className="flex items-center justify-between">
        {/* PREÇO COM DESCONTO */}
        <div>
          <div className="flex items-center gap-1">
            <h2 className="text-xl font-semibold">
              {formatCurrency(calculateProductTotalPrice(product))}
            </h2>
            {product.discountPercentage > 0 && (
              <DiscountBadge product={product} />
            )}
          </div>

          {/* PREÇO ORIGINAL */}
          {product.discountPercentage > 0 && (
            <p className="text-sm text-muted-foreground">
              De: {formatCurrency(Number(product.price))}
            </p>
          )}
        </div>

        <div className="flex items-center gap-2">
          <Button
            size="icon"
            variant="ghost"
            className="border border-muted-foreground"
            onClick={handleDecreaseQuantity}
          >
            <ChevronLeftIcon size={16} />
          </Button>
          <p className="w-8 text-center">{quantity}</p>
          <Button
            onClick={handleIncreaseQuantity}
            size="icon"
            className="border border-muted-foreground"
          >
            <ChevronRightIcon size={16} />
          </Button>
        </div>
      </div>

      {/* DESCRICAO DO PRODUTO */}

      <Card className="my-6 flex justify-around py-2.5">
        {/* CUSTO */}
        <div className="text-center">
          <div className="flex items-center gap-1 text-muted-foreground">
            <span className="text-sm">Taxa de entrega</span>

            <BikeIcon size={16} />
          </div>

          {Number(product.restaurant.deliveryFee) > 0 ? (
            <p className="text-sm">
              {formatCurrency(Number(product.restaurant.deliveryFee))}
            </p>
          ) : (
            <p className="text-sm">Grátis</p>
          )}
        </div>

        {/* TEMPO */}

        <div className="text-center">
          <div className="flex items-center gap-1 text-muted-foreground">
            <span className="text-sm">Entrega</span>

            <TimerIcon size={16} />
          </div>

          <p className="text-sm">
            {formatCurrency(Number(product.restaurant.deliveryTimeMinutes))}
          </p>
        </div>
      </Card>

      <div className="mb-6 space-y-3">
        <h3 className="">Sobre</h3>
        <p className="text-sm text-muted-foreground">{product.description}</p>
      </div>
    </div>
  );
}
