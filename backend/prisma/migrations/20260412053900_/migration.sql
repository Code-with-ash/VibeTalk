/*
  Warnings:

  - You are about to drop the column `updatedAt` on the `Otp` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `RoomUser` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `RoomUser` table. All the data in the column will be lost.
  - Added the required column `hostId` to the `Room` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Otp_email_key";

-- AlterTable
ALTER TABLE "Otp" DROP COLUMN "updatedAt",
ADD COLUMN     "verified" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Room" ADD COLUMN     "hostId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "RoomUser" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "joinedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "avatar" DROP NOT NULL;

-- CreateIndex
CREATE INDEX "Otp_email_idx" ON "Otp"("email");
