/*
  Warnings:

  - You are about to drop the column `playerId` on the `Cell` table. All the data in the column will be lost.
  - Added the required column `ownedByPlayerId` to the `Cell` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."Cell" DROP CONSTRAINT "Cell_playerId_fkey";

-- AlterTable
ALTER TABLE "public"."Cell" DROP COLUMN "playerId",
ADD COLUMN     "ownedByPlayerId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."Cell" ADD CONSTRAINT "Cell_ownedByPlayerId_fkey" FOREIGN KEY ("ownedByPlayerId") REFERENCES "public"."Player"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
