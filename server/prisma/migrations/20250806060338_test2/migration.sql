/*
  Warnings:

  - You are about to drop the column `Status` on the `Cell` table. All the data in the column will be lost.
  - Added the required column `status` to the `Cell` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Cell" DROP COLUMN "Status",
ADD COLUMN     "status" TEXT NOT NULL;
