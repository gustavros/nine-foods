import { CartContext, CartProduct } from "@/_context/cart";
import { calculateProductTotalPrice, formatCurrency } from "@/_helpers/price";
import Image from "next/image";
import { Button } from "./ui/button";
import { ChevronLeftIcon, ChevronRightIcon, TrashIcon } from "lucide-react";
import { useContext } from "react";

interface CartItemProps {
  cartProduct: CartProduct;
}

export default function CartItem({ cartProduct }: CartItemProps) {
  const {
    decreaseProductQuantity,
    increaseProductQuantity,
    removeProductFromCart,
  } = useContext(CartContext);

  function handleDecreaseQuantityClick() {
    decreaseProductQuantity(cartProduct.id);
  }

  function handleIncreaseQuantityClick() {
    increaseProductQuantity(cartProduct.id);
  }

  function handleRemoveClick() {
    removeProductFromCart(cartProduct.id);
  }

  return (
    <div className="flex flex-col items-center justify-between">
      {/* TODO: ADICIONAR INFORMAÇOES DO RESTAURANTE */}
      {/* <div>
        <h2>Você está comprando do restaurante:</h2>
        <p>{cartProduct.restaurant.name}</p>
      </div> */}

      <div className="flex w-full items-center justify-between rounded-lg border p-4 shadow-md">
        <div className="flex items-center gap-4">
          {/* IMAGEM DO PRODUTO */}
          <div className="relative h-24 w-24">
            <Image
              src={cartProduct.imageUrl}
              alt={cartProduct.name}
              fill
              className="rounded-lg object-cover"
            />
          </div>
          {/* INFORMAÇÕES DO PRODUTO */}
          <div className="flex flex-col justify-between gap-5">
            <div>
              <h3 className="text-xs">{cartProduct.name}</h3>

              <div className="flex items-center gap-1">
                <h4>
                  {formatCurrency(
                    calculateProductTotalPrice(cartProduct) *
                      cartProduct.quantity,
                  )}
                </h4>

                {cartProduct.discountPercentage > 0 && (
                  <span className="text-xs text-muted-foreground line-through">
                    {formatCurrency(
                      Number(cartProduct.price) * cartProduct.quantity,
                    )}
                  </span>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button
                size="icon"
                variant="ghost"
                className="h-6 w-6 border border-muted-foreground"
                onClick={handleDecreaseQuantityClick}
              >
                <ChevronLeftIcon size={16} />
              </Button>
              <p className="w-4 text-center">{cartProduct.quantity}</p>
              <Button
                size="icon"
                className="h-6 w-6 border border-muted-foreground"
                onClick={handleIncreaseQuantityClick}
              >
                <ChevronRightIcon size={16} />
              </Button>
            </div>
          </div>
        </div>

        <Button onClick={handleRemoveClick} size={"icon"} variant={"outline"}>
          <TrashIcon size={16} />
        </Button>
      </div>
    </div>
  );
}
