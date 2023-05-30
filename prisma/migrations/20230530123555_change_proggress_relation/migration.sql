/*
  Warnings:

  - You are about to drop the column `finished` on the `Progress` table. All the data in the column will be lost.
  - You are about to drop the column `opened` on the `Progress` table. All the data in the column will be lost.
  - You are about to drop the column `questionId` on the `Progress` table. All the data in the column will be lost.
  - Added the required column `categoryId` to the `Progress` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Progress` DROP FOREIGN KEY `Progress_questionId_fkey`;

-- AlterTable
ALTER TABLE `Progress` DROP COLUMN `finished`,
    DROP COLUMN `opened`,
    DROP COLUMN `questionId`,
    ADD COLUMN `categoryId` INTEGER NOT NULL,
    ADD COLUMN `correct` INTEGER NULL,
    ADD COLUMN `incorrect` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Progress` ADD CONSTRAINT `Progress_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `Category`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
