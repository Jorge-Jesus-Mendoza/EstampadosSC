/*
  Warnings:

  - The primary key for the `PdfFile` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `filename` on the `PdfFile` table. All the data in the column will be lost.
  - You are about to drop the column `path` on the `PdfFile` table. All the data in the column will be lost.
  - The `id` column on the `PdfFile` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `data` to the `PdfFile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mimeType` to the `PdfFile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `PdfFile` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PdfFile" DROP CONSTRAINT "PdfFile_pkey",
DROP COLUMN "filename",
DROP COLUMN "path",
ADD COLUMN     "data" BYTEA NOT NULL,
ADD COLUMN     "mimeType" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "PdfFile_pkey" PRIMARY KEY ("id");
