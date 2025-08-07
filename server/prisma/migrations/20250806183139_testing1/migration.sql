-- DropForeignKey
ALTER TABLE "public"."Shot" DROP CONSTRAINT "Shot_cellId_fkey";

-- AlterTable
ALTER TABLE "public"."Shot" ALTER COLUMN "cellId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."Shot" ADD CONSTRAINT "Shot_cellId_fkey" FOREIGN KEY ("cellId") REFERENCES "public"."Cell"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddConstraint
CREATE UNIQUE INDEX unique_cell_id_not_null ON "Shot" ("cellId") WHERE "cellId" IS NOT NULL;
