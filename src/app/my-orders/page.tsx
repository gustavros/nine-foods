import Header from "@/_components/header";
import { authOptions } from "@/_lib/auth";
import { db } from "@/_lib/prisma";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import OrderItem from "./_components/order-item";

export default async function MyOrdersPage() {
  const session = await getServerSession(authOptions);

  const orders = await db.order.findMany({
    where: {
      userId: session?.user?.id,
    },
    include: {
      restaurant: true,
      orderProducts: {
        include: {
          product: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  if (!session) {
    return redirect("/");
  }

  return (
    <>
      <Header />

      <div className="flex flex-col gap-6 px-5 py-6">
        <h2 className="text-lg font-semibold">Meus pedidos</h2>

        <div className="space-y-3">
          {orders.length === 0 ? (
            <div className="flex flex-col  gap-2">
              <p className="text-sm text-muted-foreground">
                Nenhum pedido encontrado. Faça seu pedido clicando{" "}
                <a className=" underline " href="restaurants/recommended">
                  aqui
                </a>
              </p>
            </div>
          ) : (
            orders.map((order) => <OrderItem key={order.id} order={order} />)
          )}
        </div>
      </div>
    </>
  );
}
