"use client";

import Cart from "@/_components/cart";
import { Button } from "@/_components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/_components/ui/sheet";
import { CartContext } from "@/_context/cart";
import { formatCurrency } from "@/_helpers/price";
import { Restaurant } from "@prisma/client";
import { useContext } from "react";

interface CartBannerProps {
  restaurant: Pick<Restaurant, "id">;
}

export default function CartBanner({ restaurant }: CartBannerProps) {
  const { products, totalPrice, totalQuantity } = useContext(CartContext);

  const restaurantHasProductsOnCard = products.some(
    (product) => product.restaurantId === restaurant.id,
  );

  if (!restaurantHasProductsOnCard) return null;

  return (
    <div className="fixed bottom-0 left-0 z-50 w-full border-t bg-background px-5 py-4">
      <div className="flex items-center justify-between">
        {/* PREÇO */}
        <div>
          <span className="text-xs text-muted-foreground">
            Total sem entrega
          </span>
          <div className="flex items-center">
            <h3 className="mr-1 font-semibold">{formatCurrency(totalPrice)}</h3>
            /
            <p className="ml-1 text-sm text-muted-foreground">
              {totalQuantity} {totalQuantity > 1 ? "itens" : "item"}
            </p>
          </div>
        </div>

        {/* BOTÃO */}

        <Sheet>
          <SheetTrigger>
            <Button>Ver sacola</Button>
          </SheetTrigger>
          <SheetContent className="w-dvw">
            <SheetHeader className="flex w-full items-center justify-between">
              <h2 className="text-left text-lg font-semibold">Sacola</h2>
            </SheetHeader>

            <Cart />
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}
