/*
  Warnings:

  - Added the required column `address` to the `AppointmentBooking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `preferedDate` to the `AppointmentBooking` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AppointmentBooking" ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "preferedDate" TIMESTAMP(3) NOT NULL;
