/*
  Warnings:

  - You are about to drop the column `userId` on the `LabTestBooking` table. All the data in the column will be lost.
  - Added the required column `userEmail` to the `LabTestBooking` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "LabTestBooking" DROP CONSTRAINT "LabTestBooking_userId_fkey";

-- AlterTable
ALTER TABLE "LabTestBooking" DROP COLUMN "userId",
ADD COLUMN     "userEmail" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "LabTestBooking" ADD CONSTRAINT "LabTestBooking_userEmail_fkey" FOREIGN KEY ("userEmail") REFERENCES "User"("email") ON DELETE RESTRICT ON UPDATE CASCADE;
