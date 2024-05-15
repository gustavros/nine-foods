import CategoryList from "@/_components/category-list";
import Header from "@/_components/header";
import ProductList from "@/_components/product-list";
import PromoBanner from "@/_components/promo-banner";
import { Button } from "@/_components/ui/button";
import { Warning } from "@/_components/warning";
import { db } from "@/_lib/prisma";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

export default async function Home() {
  const burguers = await db.product.findMany({
    where: {
      category: {
        name: "Hambúrgueres",
      },
    },
  });

  const pizzas = await db.product.findMany({
    where: {
      category: {
        name: "Pizzas",
      },
    },
  });

  return (
    <>
      <Header />

      <div className="px-5 pt-6">
        <CategoryList />
      </div>

      <div className="px-5 pt-6">
        <Link href={`/categories/${pizzas[0].categoryId}/products`}>
          <PromoBanner
            src={"/promo-banner-01.png"}
            alt="Até 30% de desconto em pizzas."
          />
        </Link>
      </div>

      <div className="px-5">
        <div className="flex items-center justify-between pb-4 pt-6">
          <h2 className="font-semibold">Pizzas com desconto</h2>

          <Button
            asChild
            variant={"link"}
            className="flex items-center px-0 text-primary"
          >
            <Link href={`/categories/${pizzas[0].categoryId}/products`}>
              Ver todas
              <ChevronRight size={16} />
            </Link>
          </Button>
        </div>

        <ProductList products={pizzas} />
      </div>

      <div className="px-5 pt-6">
        <Link href={`/categories/${burguers[0].categoryId}/products`}>
          <PromoBanner
            src={"/promo-banner-02.png"}
            alt="A partir de R$ 17,90 em lanches."
          />
        </Link>
      </div>

      <div className="px-5">
        <div className="flex items-center justify-between pb-4 pt-6">
          <h2 className="font-semibold">Lanches com desconto</h2>

          <Button
            asChild
            variant={"link"}
            className="flex items-center px-0 text-primary"
          >
            <Link href={`/categories/${burguers[0].categoryId}/products`}>
              Ver todos
              <ChevronRight size={16} />
            </Link>
          </Button>
        </div>

        <ProductList products={burguers} />
      </div>

      <Warning />
    </>
  );
}
