/*
  Warnings:

  - You are about to drop the column `content` on the `PdfFile` table. All the data in the column will be lost.
  - Added the required column `filename` to the `PdfFile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `path` to the `PdfFile` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PdfFile" DROP COLUMN "content",
ADD COLUMN     "filename" TEXT NOT NULL,
ADD COLUMN     "path" TEXT NOT NULL;
