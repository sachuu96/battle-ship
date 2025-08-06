-- CreateTable
CREATE TABLE "public"."Shot" (
    "id" SERIAL NOT NULL,
    "status" TEXT NOT NULL,
    "playerId" INTEGER NOT NULL,
    "cellId" INTEGER NOT NULL,

    CONSTRAINT "Shot_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."Shot" ADD CONSTRAINT "Shot_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "public"."Player"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Shot" ADD CONSTRAINT "Shot_cellId_fkey" FOREIGN KEY ("cellId") REFERENCES "public"."Cell"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
