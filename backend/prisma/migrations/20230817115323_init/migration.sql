/*
  Warnings:

  - Added the required column `created_at` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `last_login` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `policy` to the `User` table without a default value. This is not possible if the table is not empty.
  - Made the column `name` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "last_login" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "password" TEXT NOT NULL,
ADD COLUMN     "policy" BOOLEAN NOT NULL,
ALTER COLUMN "name" SET NOT NULL;
