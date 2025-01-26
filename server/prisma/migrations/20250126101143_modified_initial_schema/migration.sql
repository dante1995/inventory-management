-- DropForeignKey
ALTER TABLE "CompanyWorkspace" DROP CONSTRAINT "CompanyWorkspace_owner_id_fkey";

-- AlterTable
ALTER TABLE "CompanyWorkspace" ALTER COLUMN "owner_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "CompanyWorkspace" ADD CONSTRAINT "CompanyWorkspace_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "Resource"("id") ON DELETE SET NULL ON UPDATE CASCADE;
