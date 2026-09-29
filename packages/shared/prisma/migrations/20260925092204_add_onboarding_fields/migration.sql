-- DropForeignKey
ALTER TABLE "categories" DROP CONSTRAINT "categories_created_by_fkey";

-- DropForeignKey
ALTER TABLE "categories" DROP CONSTRAINT "categories_updated_by_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "isVerified" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "level" TEXT,
ADD COLUMN     "onboardingCompleted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "surveyAnswers" JSONB;
