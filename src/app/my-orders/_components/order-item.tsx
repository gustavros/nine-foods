"use client";

import { Button } from "@/_components/ui/button";
import { Card, CardContent } from "@/_components/ui/card";
import { CartContext } from "@/_context/cart";
import { formatCurrency } from "@/_helpers/price";
import { OrderStatus, Prisma } from "@prisma/client";
import { ChevronRightIcon } from "lucide-react";
import Link from "next/link";
import { useContext } from "react";

interface OrderItemProps {
  order: Prisma.OrderGetPayload<{
    include: {
      restaurant: true;
      orderProducts: {
        include: {
          product: true;
        };
      };
    };
  }>;
}

const getOrderStatusLabel = (status: OrderStatus) => {
  switch (status) {
    case "CONFIRMED":
      return "Confirmado";
    case "CANCELED":
      return "Cancelado";
    case "PREPARING":
      return "Preparando";
    case "DELIVERING":
      return "Saiu para entrega";
    case "FINISHED":
      return "Entregue";
  }
};

export default function OrderItem({ order }: OrderItemProps) {
  const { addProductToCart } = useContext(CartContext);

  function handleRedoOrderClick() {
    for (const orderProduct of order.orderProducts) {
      addProductToCart({
        product: {
          ...orderProduct.product,
          restaurant: order.restaurant,
          quantity: orderProduct.quantity,
        },
        emptyCart: false,
      });
    }
  }

  return (
    <Card>
      <CardContent className="p-5">
        <div
          className={`w-fit rounded-full bg-[#EEEEEE] px-2 py-1 text-muted-foreground ${order.status !== "FINISHED" && "bg-green-500 text-white"}`}
        >
          <span className="block text-xs font-semibold">
            {getOrderStatusLabel(order.status)}
          </span>
        </div>
        <div className="flex items-center justify-between pt-3">
          <div className="flex flex-col gap-3">
            <p className="text-sm ">
              Data do pedido{" "}
              {new Date(order.createdAt).toLocaleDateString("pt-BR", {
                day: "2-digit",
                month: "numeric",
                year: "numeric",
              })}{" "}
              •{" "}
              {new Date(order.createdAt).toLocaleTimeString("pt-BR", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>

          <Button variant="link" size="icon" className="h-5 w-5 " asChild>
            <Link href={`/`}>
              <ChevronRightIcon />
            </Link>
          </Button>
        </div>

        <hr className="my-3" />

        <div className="space-y-2">
          {order.orderProducts.map((product) => (
            <div key={product.id} className="flex items-center gap-2">
              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-muted-foreground">
                <span className="block text-xs text-white">
                  {product.quantity}
                </span>
              </div>
              <span className="block text-xs text-muted-foreground">
                {product.product.name}
              </span>
            </div>
          ))}
        </div>

        <hr className="my-3" />

        <div className="flex items-center justify-between">
          <p className="text-sm">{formatCurrency(Number(order.totalPrice))}</p>
          <Button
            variant="ghost"
            size="sm"
            className="text-xs text-primary"
            disabled={order.status !== "FINISHED"}
            onClick={handleRedoOrderClick}
          >
            Refazer pedido
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
