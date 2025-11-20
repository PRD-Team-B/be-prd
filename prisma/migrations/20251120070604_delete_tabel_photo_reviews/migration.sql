/*
  Warnings:

  - You are about to drop the `PhotoReviews` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "PhotoReviews" DROP CONSTRAINT "PhotoReviews_reviews_id_fkey";

-- DropTable
DROP TABLE "PhotoReviews";
