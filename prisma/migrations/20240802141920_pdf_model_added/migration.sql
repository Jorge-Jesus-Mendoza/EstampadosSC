-- CreateTable
CREATE TABLE "PdfFile" (
    "id" TEXT NOT NULL,
    "content" BYTEA NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PdfFile_pkey" PRIMARY KEY ("id")
);
