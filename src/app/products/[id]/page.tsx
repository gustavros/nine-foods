import ProductDetails from "@/components/product-details";
import ProductImage from "@/components/product-image";
import ProductList from "@/components/product-list";
import { db } from "@/lib/prisma";
import { notFound } from "next/navigation";

interface ProductPageProps {
  params: {
    id: string;
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await db.product.findUnique({
    where: {
      id: params.id,
    },
    include: {
      restaurant: true,
    },
  });

  const similarProducts = await db.product.findMany({
    where: {
      categoryId: product?.categoryId,
      id: {
        not: product?.id,
      },
      restaurantId: product?.restaurantId,
    },
    include: {
      restaurant: true,
      category: true,
    },
  });

  if (!product) {
    return notFound();
  }

  return (
    <div>
      {/* IMAGEM DO PRODUTO */}
      <ProductImage product={product} />

      {/* TITULO E PREÇO */}
      <ProductDetails product={product} />

      {/* PRODUTOS SIMILARES */}

      <div className="mb-6 space-y-3 px-5">
        <h3 className="">Produtos similares</h3>

        <ProductList products={similarProducts} />
      </div>
    </div>
  );
}
