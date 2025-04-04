/*
  Warnings:

  - You are about to drop the column `author` on the `Book` table. All the data in the column will be lost.
  - You are about to drop the column `publishedAt` on the `Book` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Book` table. All the data in the column will be lost.
  - Added the required column `name` to the `Book` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `Book` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Book" DROP COLUMN "author",
DROP COLUMN "publishedAt",
DROP COLUMN "title",
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "price" INTEGER NOT NULL;
