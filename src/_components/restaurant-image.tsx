"use client";

import Image from "next/image";
import { Button } from "./ui/button";
import { ChevronLeftIcon } from "lucide-react";
import { Restaurant, UserFavoritesRestaurants } from "@prisma/client";
import { useRouter } from "next/navigation";
import HeartButton from "./heart-button";

interface RestaurantImageProps {
  restaurant: Restaurant;
  userFavoritedRestaurants: UserFavoritesRestaurants[];
}

export default function RestaurantImage({
  restaurant,
  userFavoritedRestaurants,
}: RestaurantImageProps) {
  const router = useRouter();

  function handleBackClick() {
    router.back();
  }

  return (
    <div className="relative z-10 h-96 w-full">
      <Image
        src={restaurant.imageUrl}
        alt={restaurant.name}
        className="object-cover"
        fill
      />

      <Button
        variant={"outline"}
        className="absolute left-2 top-2 rounded-full"
        size={"icon"}
        onClick={handleBackClick}
      >
        <ChevronLeftIcon size={16} />
      </Button>

      <HeartButton
        restaurant={restaurant}
        userFavoritedRestaurants={userFavoritedRestaurants}
        className="absolute right-2 top-2 z-50 h-10 w-10"
      />
    </div>
  );
}
