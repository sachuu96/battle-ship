/*
  Warnings:

  - You are about to drop the column `cellCordinates` on the `Shot` table. All the data in the column will be lost.
  - Added the required column `cellCoordinates` to the `Shot` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Shot" DROP COLUMN "cellCordinates",
ADD COLUMN     "cellCoordinates" JSONB NOT NULL;
