-- CreateTable
CREATE TABLE "catalog_Url" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "catalog_Url_pkey" PRIMARY KEY ("id")
);
