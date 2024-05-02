import { BikeIcon, TimerIcon } from "lucide-react";
import { Card } from "./ui/card";
import { formatCurrency } from "@/helpers/price";
import { Restaurant } from "@prisma/client";

interface DeliveryInfoProps {
  restaurant: Pick<Restaurant, "deliveryFee" | "deliveryTimeMinutes">;
}

export default function DeliveryInfo({ restaurant }: DeliveryInfoProps) {
  return (
    <Card className="my-6 flex justify-around py-2.5">
      {/* CUSTO */}
      <div className="text-center">
        <div className="flex items-center gap-1 text-muted-foreground">
          <span className="text-sm">Taxa de entrega</span>

          <BikeIcon size={16} />
        </div>

        {Number(restaurant.deliveryFee) > 0 ? (
          <p className="text-sm">
            {formatCurrency(Number(restaurant.deliveryFee))}
          </p>
        ) : (
          <p className="text-sm">Grátis</p>
        )}
      </div>

      {/* TEMPO */}

      <div className="text-center">
        <div className="flex items-center gap-1 text-muted-foreground">
          <span className="text-sm">Entrega</span>

          <TimerIcon size={16} />
        </div>

        <p className="text-sm">{restaurant.deliveryTimeMinutes} min</p>
      </div>
    </Card>
  );
}
