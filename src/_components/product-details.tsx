"use client";

import { formatCurrency, calculateProductTotalPrice } from "@/_helpers/price";
import { Prisma } from "@prisma/client";
import DiscountBadge from "./discount-badge";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { Button } from "./ui/button";
import { useCallback, useContext, useState } from "react";
import ProductList from "./product-list";
import DeliveryInfo from "./delivery-info";
import { CartContext } from "@/_context/cart";
import { Sheet, SheetContent, SheetHeader } from "./ui/sheet";
import Cart from "./cart";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";

interface ProductDetailsProps {
  product: Prisma.ProductGetPayload<{
    include: {
      restaurant: true;
    };
  }>;
  similarProducts: Prisma.ProductGetPayload<{
    include: {
      restaurant: true;
    };
  }>[];
}

export default function ProductDetails({
  product,
  similarProducts,
}: ProductDetailsProps) {
  const [quantity, setQuantity] = useState(1);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isConfirmationDialogOpen, setIsConfirmationDialogOpen] =
    useState(false);

  const { addProductToCart, products } = useContext(CartContext);

  function addToCart({ emptyCart = false }: { emptyCart?: boolean }) {
    addProductToCart({ product: { ...product, quantity }, emptyCart });

    setIsCartOpen(true);
  }

  function handleAddToCartClick() {
    const hasDifferentRestaurantProduct = products.some(
      (cartProduct) => cartProduct.restaurantId !== product.restaurant.id,
    );

    if (hasDifferentRestaurantProduct) {
      return setIsConfirmationDialogOpen(true);
    }

    addToCart({
      emptyCart: false,
    });
  }

  const handleIncreaseQuantity = useCallback(() => {
    setQuantity((currentState) => currentState + 1);
  }, []);

  const handleDecreaseQuantity = useCallback(() => {
    if (quantity <= 1) {
      return;
    }

    setQuantity((currentState) => currentState - 1);
  }, [quantity]);

  return (
    <>
      <div className="relative z-50 -mt-5 rounded-t-lg bg-background p-5">
        {/* NOME DO PRODUTO */}

        {/* PREÇO DO PRODUTO E QUANTIDADE */}
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <h1 className="mb-3 mt-1 text-xl font-semibold ">{product.name}</h1>
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
        <DeliveryInfo restaurant={product.restaurant} />

        <div className="mb-6 space-y-3">
          <h3 className="">Sobre</h3>
          <p className="text-sm text-muted-foreground">{product.description}</p>
        </div>

        <div className="mb-6 space-y-3">
          <h3 className="">Produtos similares</h3>

          <ProductList products={similarProducts} />
        </div>

        <div className="sticky bottom-0 w-full bg-background py-2">
          <Button
            onClick={handleAddToCartClick}
            className="w-full font-semibold"
          >
            Adicionar á sacola
          </Button>
        </div>
      </div>

      <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
        <SheetContent className="w-dvw">
          <SheetHeader className="flex w-full items-center justify-between">
            <h2 className="text-left text-lg font-semibold">Sacola</h2>
          </SheetHeader>

          <Cart isCartOpen={isCartOpen} setIsCartOpen={setIsCartOpen} />
        </SheetContent>
      </Sheet>

      <AlertDialog
        open={isConfirmationDialogOpen}
        onOpenChange={setIsConfirmationDialogOpen}
      >
        <AlertDialogContent className="flex flex-col items-center">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-center">
              Você só pode adicionar itens de um restaurante por vez
            </AlertDialogTitle>
            <AlertDialogDescription className="text-center">
              Deseja esvaziar a sacola e adicionar este item?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex flex-col">
            <AlertDialogAction onClick={() => addToCart({ emptyCart: true })}>
              Esvaziar sacola e adicionar
            </AlertDialogAction>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
