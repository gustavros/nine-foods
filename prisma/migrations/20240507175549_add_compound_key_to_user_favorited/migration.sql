/*
  Warnings:

  - The primary key for the `UserFavoritesRestaurants` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `UserFavoritesRestaurants` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "UserFavoritesRestaurants" DROP CONSTRAINT "UserFavoritesRestaurants_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "UserFavoritesRestaurants_pkey" PRIMARY KEY ("userId", "restaurantId");
