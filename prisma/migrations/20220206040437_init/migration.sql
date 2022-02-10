/*
  Warnings:

  - You are about to drop the column `amount` on the `Donation` table. All the data in the column will be lost.
  - Added the required column `count` to the `Donation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Donation" DROP COLUMN "amount",
ADD COLUMN     "count" INTEGER NOT NULL;
