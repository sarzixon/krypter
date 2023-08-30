/*
  Warnings:

  - You are about to drop the column `currency` on the `Asset` table. All the data in the column will be lost.
  - You are about to drop the column `value` on the `Asset` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Asset" DROP COLUMN "currency",
DROP COLUMN "value";
