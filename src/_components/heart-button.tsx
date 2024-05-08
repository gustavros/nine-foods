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
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface HeartButtonProps {
  className?: string;
  restaurant: Restaurant;
  userFavoritedRestaurants: UserFavoritesRestaurants[];
}

export default function HeartButton({
  className,
  restaurant,
  userFavoritedRestaurants,
}: HeartButtonProps) {
  const { data } = useSession();

  const router = useRouter();

  const isFavorite = userFavoritedRestaurants?.some(
    (favorite) => favorite.restaurantId === restaurant.id,
  );

  async function handleFavoriteClick() {
    if (!data?.user.id) return;

    try {
      if (isFavorite) {
        await unfavoriteRestaurant(data.user.id, restaurant.id);
        return toast.success("Restaurante desfavoritado com sucesso!", {
          position: "top-center",
        });
      }

      await favoriteRestaurant(data.user.id, restaurant.id);

      toast.success("Restaurante favoritado com sucesso!", {
        position: "top-center",
        action: {
          label: "Ver favoritos",
          onClick: () => router.push("/my-favorite-restaurants"),
        },
      });
    } catch (error) {
      toast.error("Ocorreu um erro ao favoritar o restaurante.", {
        position: "top-center",
        action: {
          label: "Ver detalhes",
          onClick: () => console.log(error),
        },
      });
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
