import { Suspense } from "react";
import Restaurants from "./_components/restaurants";

export default function RestaurantsPage() {
  return (
    <Suspense>
      <Restaurants />;
    </Suspense>
  );
}
