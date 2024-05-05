import CategoryItem from "@/_components/category-item";
import DeliveryInfo from "@/_components/delivery-info";
import ProductItem from "@/_components/product-item";
import ProductList from "@/_components/product-list";
import RestaurantImage from "@/_components/restaurant-image";
import StarBadge from "@/_components/star-badge";
import { Carousel, CarouselContent } from "@/_components/ui/carousel";
import { db } from "@/_lib/prisma";
import Image from "next/image";
import { notFound } from "next/navigation";
import CartBanner from "./_components/cart-banner";

interface ProductPageProps {
  params: {
    id: string;
  };
}

export default async function ProductPage({
  params: { id },
}: ProductPageProps) {
  const restaurant = await db.restaurant.findUnique({
    where: {
      id,
    },
    include: {
      categories: {
        include: {
          products: {
            where: {
              restaurantId: id,
            },
            include: {
              restaurant: true,
            },
          },
        },
        orderBy: {
          name: "asc",
        },
      },
      products: {
        take: 10,
        include: {
          restaurant: true,
        },
      },
    },
  });

  if (!restaurant) {
    return notFound();
  }

  return (
    <div>
      <RestaurantImage restaurant={restaurant} />

      <div className="relative z-50 -mt-5 rounded-t-lg bg-background px-5 pt-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <div className="relative h-8 w-8">
              <Image
                src={restaurant.imageUrl}
                alt={restaurant.name}
                fill
                className="rounded-full object-cover dark:border-2 dark:border-white"
              />
            </div>

            <h1 className="text-xl font-semibold">{restaurant.name}</h1>
          </div>

          <StarBadge restaurant={restaurant} />
        </div>

        <DeliveryInfo restaurant={restaurant} />
      </div>

      <Carousel className="px-5">
        <CarouselContent className="-ml-0 flex  gap-4 pb-2">
          {restaurant.categories.map((category) => (
            <CategoryItem key={category.id} category={category} />
          ))}
        </CarouselContent>
      </Carousel>

      <div className="mt-6 space-y-4 px-5">
        {/* TODO: mostrar produtos mais pedidos  */}
        <h1 className="font-semibold">Mais pedidos</h1>

        <Carousel>
          <CarouselContent className="-ml-0 flex  gap-4 pb-2">
            {restaurant.products.map((product) => (
              <ProductItem key={product.id} product={product} />
            ))}
          </CarouselContent>
        </Carousel>
      </div>

      {restaurant.categories.map((category) => (
        <div className="mt-6 space-y-4 px-5" key={category.id}>
          <h1 className="font-semibold">{category.name}</h1>

          <ProductList products={category.products} />
        </div>
      ))}

      <CartBanner restaurant={restaurant} />
    </div>
  );
}
