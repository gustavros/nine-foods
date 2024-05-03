import CategoryList from "@/components/category-list";
import Header from "@/components/header";
import ProductList from "@/components/product-list";
import PromoBanner from "@/components/promo-banner";
import RestaurantList from "@/components/restaurant-list";
import { Button } from "@/components/ui/button";
import { db } from "@/lib/prisma";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

export default async function Home() {
  const pizzaCategoryId = "c74572af-c874-4bd0-b7f2-ce36b1047244";
  const burguerCategoryId = "4ef01674-dccb-4437-b059-06fde8f0b2ca";

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
        <PromoBanner
          src={"/promo-banner-01.png"}
          alt="Até 30% de desconto em pizzas."
        />
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
        <PromoBanner
          src={"/promo-banner-02.png"}
          alt="A partir de R$ 17,90 em lanches."
        />
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
