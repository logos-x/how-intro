-- AlterTable
ALTER TABLE "Role" ADD COLUMN     "isProtected" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "emailVerifiedAt" TIMESTAMP(3);
