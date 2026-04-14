/*
  Warnings:

  - You are about to drop the column `phonenumber` on the `Otp` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Otp_phonenumber_key";

-- AlterTable
ALTER TABLE "Otp" DROP COLUMN "phonenumber";
