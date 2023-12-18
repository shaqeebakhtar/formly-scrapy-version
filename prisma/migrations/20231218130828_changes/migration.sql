/*
  Warnings:

  - You are about to drop the column `responses` on the `Form` table. All the data in the column will be lost.
  - Made the column `workspaceId` on table `Form` required. This step will fail if there are existing NULL values in that column.
  - Made the column `userId` on table `Workspace` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Form" DROP CONSTRAINT "Form_workspaceId_fkey";

-- DropForeignKey
ALTER TABLE "Workspace" DROP CONSTRAINT "Workspace_userId_fkey";

-- AlterTable
ALTER TABLE "Form" DROP COLUMN "responses",
ADD COLUMN     "formFields" JSONB,
ALTER COLUMN "workspaceId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Workspace" ALTER COLUMN "isDemo" DROP NOT NULL,
ALTER COLUMN "userId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Workspace" ADD CONSTRAINT "Workspace_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Form" ADD CONSTRAINT "Form_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "Workspace"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
