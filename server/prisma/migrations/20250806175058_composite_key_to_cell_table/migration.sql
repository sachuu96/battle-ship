/*
  Warnings:

  - A unique constraint covering the columns `[X,Y,ownedByPlayerId]` on the table `Cell` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Cell_X_Y_ownedByPlayerId_key" ON "public"."Cell"("X", "Y", "ownedByPlayerId");
