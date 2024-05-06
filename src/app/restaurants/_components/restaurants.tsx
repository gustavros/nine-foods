"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import searchForRestaurants from "../_actions/search";
import Header from "@/_components/header";

import RestaurantRecommendedItem from "@/app/restaurants/recommended/_components/recommended-restaurant-item";
import RestaurantRecommendedSkeleton from "@/app/restaurants/recommended/_components/recommended-restaurant-skeleton";

export default function Restaurants() {
  const searchParams = useSearchParams();
  const [restaurants, setRestaurants] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const searchFor = searchParams.get("search");

  useEffect(() => {
    setLoading(true);
    async function fetchRestaurants() {
      if (!searchFor) return;

      const foundRestaurants = await searchForRestaurants(searchFor);

      setRestaurants(foundRestaurants);
      setLoading(false);
    }

    fetchRestaurants();
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
            <div className="flex w-full flex-col gap-3">
              <RestaurantRecommendedSkeleton />
              <RestaurantRecommendedSkeleton />
              <RestaurantRecommendedSkeleton />
              <RestaurantRecommendedSkeleton />
            </div>
          ) : (
            restaurants.map((restaurant) => (
              <RestaurantRecommendedItem
                restaurant={restaurant}
                key={restaurant.id}
              />
            ))
          )}
        </div>
      </div>
    </>
  );
}
