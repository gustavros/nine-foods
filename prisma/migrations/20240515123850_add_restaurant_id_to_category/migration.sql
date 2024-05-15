/*
  Warnings:

  - You are about to drop the `UserFavoritesRestaurants` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_CategoryToRestaurant` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "UserFavoritesRestaurants" DROP CONSTRAINT "UserFavoritesRestaurants_restaurantId_fkey";

-- DropForeignKey
ALTER TABLE "UserFavoritesRestaurants" DROP CONSTRAINT "UserFavoritesRestaurants_userId_fkey";

-- DropForeignKey
ALTER TABLE "_CategoryToRestaurant" DROP CONSTRAINT "_CategoryToRestaurant_A_fkey";

-- DropForeignKey
ALTER TABLE "_CategoryToRestaurant" DROP CONSTRAINT "_CategoryToRestaurant_B_fkey";

-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "restaurantId" TEXT;

-- DropTable
DROP TABLE "UserFavoritesRestaurants";

-- DropTable
DROP TABLE "_CategoryToRestaurant";

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_restaurantId_fkey" FOREIGN KEY ("restaurantId") REFERENCES "Restaurant"("id") ON DELETE SET NULL ON UPDATE CASCADE;
