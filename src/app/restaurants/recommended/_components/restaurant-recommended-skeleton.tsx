import { Skeleton } from "../../../../_components/ui/skeleton";

interface RestaurantRecommendedSkeletonProps {}

export default function RestaurantRecommendedSkeleton({}: RestaurantRecommendedSkeletonProps) {
  return (
    <div className="relative flex gap-6 rounded-lg border border-muted px-4 py-4">
      <Skeleton className="relative h-24 w-24 " />

      <div className="space-y-2">
        <Skeleton className="h-4 w-40" />
        <Skeleton className="h-4 w-32" />
      </div>
    </div>
  );
}
