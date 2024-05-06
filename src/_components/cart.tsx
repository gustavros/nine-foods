import { CartContext } from "@/_context/cart";
import { useContext, useState } from "react";
import CartItem from "./cart-item";
import { Card, CardContent } from "./ui/card";
import { formatCurrency } from "@/_helpers/price";
import { Button } from "./ui/button";
import createOrder from "@/_actions/order";
import { OrderStatus } from "@prisma/client";
import { useSession } from "next-auth/react";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Cart() {
  const router = useRouter();

  const [isSubmitLoading, setIsSubmitLoading] = useState(false);

  const { products, totalPrice, totalDiscounts, subtotalPrice, clearCart } =
    useContext(CartContext);

  const { data } = useSession();

  async function handleFinishOrderClick() {
    if (!data) return;

    const restaurant = products?.[0].restaurant;

    try {
      setIsSubmitLoading(true);
      await createOrder({
        subtotalPrice,
        totalDiscounts,
        totalPrice,
        deliveryFee: restaurant?.deliveryFee,
        deliveryTimeMinutes: restaurant?.deliveryTimeMinutes,
        restaurant: {
          connect: {
            id: restaurant?.id,
          },
        },
        status: OrderStatus.CONFIRMED,
        user: {
          connect: {
            id: data.user.id,
          },
        },
        orderProducts: {
          createMany: {
            data: products.map((product) => ({
              productId: product.id,
              quantity: product.quantity,
            })),
          },
        },
      });

      clearCart();

      router.push("/my-orders");
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitLoading(false);
    }
  }

  return (
    <>
      <div className="flex h-full flex-col justify-between space-y-3 py-5">
        {products.length > 0 ? (
          <>
            <div className="h-auto space-y-3 overflow-y-auto">
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

              <Button
                onClick={handleFinishOrderClick}
                className="w-full"
                disabled={isSubmitLoading}
              >
                {isSubmitLoading && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                Finalizar pedido
              </Button>
            </div>
          </>
        ) : (
          <h2 className="text-center text-muted-foreground">Carrinho vazio.</h2>
        )}
      </div>
    </>
  );
}
