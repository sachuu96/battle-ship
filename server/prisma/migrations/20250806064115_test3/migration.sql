/*
  Warnings:

  - Added the required column `isSunk` to the `Ship` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Ship" ADD COLUMN     "isSunk" BOOLEAN NOT NULL;
