/*
  Warnings:

  - You are about to drop the `Products` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Reviews` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Reviews" DROP CONSTRAINT "Reviews_products_id_fkey";

-- DropTable
DROP TABLE "public"."Products";

-- DropTable
DROP TABLE "public"."Reviews";

-- CreateTable
CREATE TABLE "public"."products" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(100) NOT NULL,
    "photo" TEXT NOT NULL DEFAULT 'no image',
    "description" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6),

    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."reviews" (
    "id" SERIAL NOT NULL,
    "products_id" INTEGER NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "ratings" INTEGER NOT NULL,
    "comments" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "reviews_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."reviews" ADD CONSTRAINT "reviews_products_id_fkey" FOREIGN KEY ("products_id") REFERENCES "public"."products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
