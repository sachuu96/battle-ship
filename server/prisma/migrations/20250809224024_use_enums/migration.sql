/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - Changed the type of `status` on the `Game` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `type` on the `Ship` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `status` on the `Shot` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "public"."ShipType" AS ENUM ('battle', 'destroyer');

-- CreateEnum
CREATE TYPE "public"."ShotStatus" AS ENUM ('hit', 'missed');

-- CreateEnum
CREATE TYPE "public"."GameStatus" AS ENUM ('inProgress', 'completed');

-- AlterTable
ALTER TABLE "public"."Game" DROP COLUMN "status",
ADD COLUMN     "status" "public"."GameStatus" NOT NULL;

-- AlterTable
ALTER TABLE "public"."Ship" DROP COLUMN "type",
ADD COLUMN     "type" "public"."ShipType" NOT NULL;

-- AlterTable
ALTER TABLE "public"."Shot" DROP COLUMN "status",
ADD COLUMN     "status" "public"."ShotStatus" NOT NULL;

-- DropTable
DROP TABLE "public"."User";
