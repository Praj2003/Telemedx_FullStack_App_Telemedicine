-- CreateTable
CREATE TABLE "LabTestBooking" (
    "id" TEXT NOT NULL,
    "patientName" TEXT NOT NULL,
    "contactNumber" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "testType" TEXT NOT NULL,
    "preferedDate" TIMESTAMP(3) NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'Pending',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,

    CONSTRAINT "LabTestBooking_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "LabTestBooking" ADD CONSTRAINT "LabTestBooking_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
