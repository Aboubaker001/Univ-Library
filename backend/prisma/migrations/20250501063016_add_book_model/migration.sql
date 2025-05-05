-- CreateEnum
CREATE TYPE "BookStatus" AS ENUM ('AVAILABLE', 'CHECKED_OUT', 'RESERVED', 'UNDER_MAINTENANCE', 'LOST');

-- CreateTable
CREATE TABLE "Book" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "edition" TEXT NOT NULL,
    "publisher" TEXT NOT NULL,
    "publicationYear" INTEGER NOT NULL,
    "pageCout" INTEGER NOT NULL,
    "language" TEXT NOT NULL,
    "coverUrl" TEXT NOT NULL,
    "digitalCopyUrl" TEXT NOT NULL,
    "keywords" TEXT[],
    "authors" TEXT[],
    "status" "BookStatus" NOT NULL DEFAULT 'AVAILABLE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Book_pkey" PRIMARY KEY ("id")
);
