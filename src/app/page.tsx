import CategoryList from "@/_components/category-list";
import Header from "@/_components/header";
import ProductList from "@/_components/product-list";
import PromoBanner from "@/_components/promo-banner";
import RestaurantList from "@/_components/restaurant-list";
import { Button } from "@/_components/ui/button";
import { db } from "@/_lib/prisma";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

export default async function Home() {
  const pizzaCategoryId = "ea74af8a-76e7-44a5-a4a0-1081fd3d8b13";
  const burguerCategoryId = "e96b9bc2-643d-434f-abb6-ed4c10e1c6bc";

  const pizzas = await db.product.findMany({
    where: {
      discountPercentage: {
        gt: 0,
      },
      categoryId: pizzaCategoryId,
    },
    include: {
      restaurant: true,
    },
  });

  const burguers = await db.product.findMany({
    where: {
      discountPercentage: {
        gt: 0,
      },
      categoryId: burguerCategoryId,
    },
    include: {
      restaurant: true,
    },
  });

  return (
    <>
      <Header />

      <div className="px-5 pt-6">
        <CategoryList />
      </div>

      <div className="px-5 pt-6">
        <Link href={`/categories/${pizzaCategoryId}/products`}>
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
            <Link href={`/categories/${pizzaCategoryId}/products`}>
              Ver todas
              <ChevronRight size={16} />
            </Link>
          </Button>
        </div>

        <ProductList products={pizzas} />
      </div>

      <div className="px-5 pt-6">
        <Link href={`/categories/${burguerCategoryId}/products`}>
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
            <Link href={`/categories/${burguerCategoryId}/products`}>
              Ver todos
              <ChevronRight size={16} />
            </Link>
          </Button>
        </div>

        <ProductList products={burguers} />
      </div>

      <hr className="mx-5 my-2" />

      <div className="px-5">
        <div className="flex items-center justify-between pb-4 pt-6">
          <h2 className="font-semibold">Restaurantes recomendados</h2>

          <Button
            variant={"link"}
            className="flex items-center px-0 text-primary"
            asChild
          >
            <Link href={"/restaurants/recommended"}>
              Ver todos
              <ChevronRight size={16} />
            </Link>
          </Button>
        </div>

        <RestaurantList />
      </div>
    </>
  );
}
