/*
  Warnings:

  - You are about to drop the column `followUpDate` on the `Appointment` table. All the data in the column will be lost.
  - You are about to drop the column `vitals` on the `Appointment` table. All the data in the column will be lost.
  - You are about to drop the column `availableDays` on the `Doctor` table. All the data in the column will be lost.
  - You are about to drop the column `endTime` on the `Doctor` table. All the data in the column will be lost.
  - You are about to drop the column `startTime` on the `Doctor` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Appointment" DROP COLUMN "followUpDate",
DROP COLUMN "vitals",
ADD COLUMN     "O2Saturation" TEXT,
ADD COLUMN     "Tempreture" TEXT,
ADD COLUMN     "bloodPressure" TEXT,
ADD COLUMN     "heartRate" TEXT;

-- AlterTable
ALTER TABLE "Doctor" DROP COLUMN "availableDays",
DROP COLUMN "endTime",
DROP COLUMN "startTime";

-- AlterTable
ALTER TABLE "Patient" ADD COLUMN     "bloodGroup" TEXT;
