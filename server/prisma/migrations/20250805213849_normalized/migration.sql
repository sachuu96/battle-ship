-- CreateTable
CREATE TABLE "public"."Game" (
    "id" TEXT NOT NULL,

    CONSTRAINT "Game_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Player" (
    "id" TEXT NOT NULL,
    "gameId" TEXT NOT NULL,

    CONSTRAINT "Player_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Ship" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "gameId" TEXT NOT NULL,
    "playerId" TEXT NOT NULL,

    CONSTRAINT "Ship_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Cell" (
    "id" TEXT NOT NULL,
    "X" INTEGER NOT NULL,
    "Y" INTEGER NOT NULL,
    "Status" TEXT NOT NULL,
    "playerId" TEXT NOT NULL,
    "shipId" TEXT NOT NULL,

    CONSTRAINT "Cell_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."Player" ADD CONSTRAINT "Player_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "public"."Game"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Ship" ADD CONSTRAINT "Ship_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "public"."Game"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Ship" ADD CONSTRAINT "Ship_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "public"."Player"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Cell" ADD CONSTRAINT "Cell_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "public"."Player"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Cell" ADD CONSTRAINT "Cell_shipId_fkey" FOREIGN KEY ("shipId") REFERENCES "public"."Ship"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
