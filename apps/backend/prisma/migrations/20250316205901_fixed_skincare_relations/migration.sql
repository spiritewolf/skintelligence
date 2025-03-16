/*
  Warnings:

  - You are about to drop the `_SkincareProductToSkincareRecommendation` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `recommendationId` to the `SkincareProduct` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_SkincareProductToSkincareRecommendation" DROP CONSTRAINT "_SkincareProductToSkincareRecommendation_A_fkey";

-- DropForeignKey
ALTER TABLE "_SkincareProductToSkincareRecommendation" DROP CONSTRAINT "_SkincareProductToSkincareRecommendation_B_fkey";

-- AlterTable
ALTER TABLE "SkincareProduct" ADD COLUMN     "recommendationId" UUID NOT NULL;

-- DropTable
DROP TABLE "_SkincareProductToSkincareRecommendation";

-- AddForeignKey
ALTER TABLE "SkincareProduct" ADD CONSTRAINT "SkincareProduct_recommendationId_fkey" FOREIGN KEY ("recommendationId") REFERENCES "SkincareRecommendation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
