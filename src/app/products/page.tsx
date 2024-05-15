"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import Header from "@/_components/header";

import searchForProducts from "./_actions/search";

export default function Products() {
  const searchParams = useSearchParams();
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const searchFor = searchParams.get("search");

  useEffect(() => {
    setLoading(true);
    async function fetchProducts() {
      if (!searchFor) return;

      const foundProducts = await searchForProducts(searchFor);

      setProducts(foundProducts);
      setLoading(false);
    }

    fetchProducts();
  }, [searchFor]);

  if (!searchFor) {
    return (
      <div>
        <Header />

        <p className="p-5">Nenhuma busca informada.</p>
      </div>
    );
  }

  return (
    <>
      <Header />

      <div className="p-5">
        <h2 className="pb-4 text-lg font-semibold">
          Resultados para {""}
          <span className="text-red-400">{searchParams.get("search")}</span>
        </h2>

        <div className="flex w-full flex-col gap-3">
          {loading ? (
            <div className="flex w-full flex-col gap-3">Loading...</div>
          ) : (
            products.map((product) => <h1 key={product.id}>{product.name}</h1>)
          )}
        </div>
      </div>
    </>
  );
}
