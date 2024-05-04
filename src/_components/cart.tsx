import { CartContext } from "@/_context/cart";
import { useContext } from "react";
import CartItem from "./cart-item";
import { Card, CardContent } from "./ui/card";
import { formatCurrency } from "@/_helpers/price";
import { Button } from "./ui/button";

interface CartProps {}

export default function Cart({}: CartProps) {
  const { products, totalPrice, totalDiscounts, subtotalPrice } =
    useContext(CartContext);

  return (
    <div className="flex h-full flex-col justify-between space-y-3 py-5">
      {products.length > 0 ? (
        <>
          <div className="space-y-3">
            {products.map((product) => (
              <CartItem key={product.id} cartProduct={product} />
            ))}
          </div>

          <div className="flex flex-col gap-6">
            <Card>
              <CardContent className="space-y-3 divide-y divide-muted-foreground p-5">
                <div className="flex items-center justify-between pt-2">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="text-right font-bold">
                    {formatCurrency(subtotalPrice)}
                  </span>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <span className="text-muted-foreground">
                    Total de descontos
                  </span>
                  <span className="text-right font-bold text-emerald-500">
                    - {formatCurrency(totalDiscounts)}
                  </span>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <span className="text-muted-foreground">Entrega</span>
                  {Number(products?.[0].restaurant.deliveryFee) === 0 ? (
                    <span className="text-right font-bold text-emerald-500">
                      Grátis
                    </span>
                  ) : (
                    <span className="text-right font-bold">
                      {formatCurrency(
                        Number(products?.[0].restaurant.deliveryFee),
                      )}
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between pt-2">
                  <span className="text-muted-foreground">Total</span>
                  <span className="text-right font-bold">
                    {formatCurrency(totalPrice)}
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* FINALIZAR PEDIDO */}

            <Button className="w-full">Finalizar pedido</Button>
          </div>
        </>
      ) : (
        <h2 className="text-center text-muted-foreground">Carrinho vazio.</h2>
      )}
    </div>
  );
}
