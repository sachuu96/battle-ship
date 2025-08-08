/*
  Warnings:

  - Added the required column `cellCordinates` to the `Shot` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Shot" ADD COLUMN     "cellCordinates" JSONB NOT NULL;
