/*
  Warnings:

  - You are about to drop the `Category` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_CategoryToProduct` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ChangeToProduct` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `avaliable` to the `Change` table without a default value. This is not possible if the table is not empty.
  - Added the required column `discountPercent` to the `Change` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imageUrl` to the `Change` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Change` table without a default value. This is not possible if the table is not empty.
  - Added the required column `originalPrice` to the `Change` table without a default value. This is not possible if the table is not empty.
  - Added the required column `priceWithDiscount` to the `Change` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productId` to the `Change` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imageUrl` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_CategoryToProduct" DROP CONSTRAINT "_CategoryToProduct_A_fkey";

-- DropForeignKey
ALTER TABLE "_CategoryToProduct" DROP CONSTRAINT "_CategoryToProduct_B_fkey";

-- DropForeignKey
ALTER TABLE "_ChangeToProduct" DROP CONSTRAINT "_ChangeToProduct_A_fkey";

-- DropForeignKey
ALTER TABLE "_ChangeToProduct" DROP CONSTRAINT "_ChangeToProduct_B_fkey";

-- AlterTable
ALTER TABLE "Change" ADD COLUMN     "avaliable" BOOLEAN NOT NULL,
ADD COLUMN     "discountPercent" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "imageUrl" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "originalPrice" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "priceWithDiscount" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "productId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "imageUrl" TEXT NOT NULL;

-- DropTable
DROP TABLE "Category";

-- DropTable
DROP TABLE "_CategoryToProduct";

-- DropTable
DROP TABLE "_ChangeToProduct";

-- AddForeignKey
ALTER TABLE "Change" ADD CONSTRAINT "Change_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
