"use client";

import Image from "next/image";
import { Button } from "./ui/button";
import { ChevronLeftIcon, HeartIcon } from "lucide-react";
import { Restaurant } from "@prisma/client";
import { useRouter } from "next/navigation";

interface RestaurantImageProps {
  restaurant: Pick<Restaurant, "name" | "imageUrl">;
}

export default function RestaurantImage({ restaurant }: RestaurantImageProps) {
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

      <Button
        size={"icon"}
        className="absolute right-4 top-4 rounded-full bg-muted-foreground px-1"
      >
        <HeartIcon
          size={18}
          className="h-fit w-fit transition-all hover:fill-white"
        />
      </Button>
    </div>
  );
}
