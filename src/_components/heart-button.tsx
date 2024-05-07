"use client";

import { HeartIcon } from "lucide-react";
import { Button } from "./ui/button";
import { cn } from "@/_lib/utils";
import { Restaurant, UserFavoritesRestaurants } from "@prisma/client";
import {
  favoriteRestaurant,
  unfavoriteRestaurant,
} from "@/_actions/favorite-restaurant";
import { toast } from "sonner";

interface HeartButtonProps {
  className?: string;
  restaurant: Restaurant;
  userId: string | undefined;
  userFavoritedRestaurants: UserFavoritesRestaurants[];
}

export default function HeartButton({
  className,
  restaurant,
  userId,
  userFavoritedRestaurants,
}: HeartButtonProps) {
  const isFavorite = userFavoritedRestaurants.some(
    (favorite) => favorite.restaurantId === restaurant.id,
  );

  async function handleFavoriteClick() {
    if (!userId) return;

    try {
      if (isFavorite) {
        await unfavoriteRestaurant(userId, restaurant.id);
        return toast.success("Restaurante desfavoritado com sucesso!");
      }

      await favoriteRestaurant(userId, restaurant.id);

      toast.success("Restaurante favoritado com sucesso!");
    } catch (error) {
      toast.error("Ocorreu um erro ao favoritar o restaurante.");
    }
  }

  return (
    <Button
      onClick={handleFavoriteClick}
      size={"icon"}
      className={cn("group h-7 w-7 rounded-full px-1", className)}
    >
      <HeartIcon
        size={16}
        className={`h-fit w-fit group-hover:fill-accent ${isFavorite && "fill-accent"}`}
      />
    </Button>
  );
}
