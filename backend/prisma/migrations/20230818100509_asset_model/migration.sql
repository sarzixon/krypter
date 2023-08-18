-- CreateEnum
CREATE TYPE "AssetType" AS ENUM ('CURRENCY', 'STOCK', 'CRYPTO');

-- CreateTable
CREATE TABLE "Asset" (
    "id" SERIAL NOT NULL,
    "ownerId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "quantity" DECIMAL(65,30) NOT NULL,
    "type" "AssetType" NOT NULL,
    "currency" TEXT NOT NULL,
    "value" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "Asset_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Asset_name_key" ON "Asset"("name");

-- AddForeignKey
ALTER TABLE "Asset" ADD CONSTRAINT "Asset_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;
