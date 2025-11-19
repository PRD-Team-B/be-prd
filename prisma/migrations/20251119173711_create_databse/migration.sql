-- CreateTable
CREATE TABLE "Products" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(100) NOT NULL,
    "photo" TEXT NOT NULL DEFAULT 'no image',
    "description" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Reviews" (
    "id" SERIAL NOT NULL,
    "products_id" INTEGER NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "ratings" INTEGER NOT NULL,
    "comments" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Reviews_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PhotoReviews" (
    "id" SERIAL NOT NULL,
    "reviews_id" INTEGER NOT NULL,
    "link" INTEGER NOT NULL,

    CONSTRAINT "PhotoReviews_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Reviews" ADD CONSTRAINT "Reviews_products_id_fkey" FOREIGN KEY ("products_id") REFERENCES "Products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PhotoReviews" ADD CONSTRAINT "PhotoReviews_reviews_id_fkey" FOREIGN KEY ("reviews_id") REFERENCES "Reviews"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
