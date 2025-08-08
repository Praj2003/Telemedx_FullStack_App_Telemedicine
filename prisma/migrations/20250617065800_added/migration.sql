-- CreateTable
CREATE TABLE "AppointmentBooking" (
    "id" TEXT NOT NULL,
    "patientName" TEXT NOT NULL,
    "contactNumber" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'Confirmed',
    "doctorAttending" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userEmail" TEXT NOT NULL,

    CONSTRAINT "AppointmentBooking_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "AppointmentBooking" ADD CONSTRAINT "AppointmentBooking_userEmail_fkey" FOREIGN KEY ("userEmail") REFERENCES "User"("email") ON DELETE RESTRICT ON UPDATE CASCADE;
