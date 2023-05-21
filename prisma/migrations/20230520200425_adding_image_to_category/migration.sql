/*
  Warnings:

  - You are about to drop the column `image` on the `Category` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Category` DROP COLUMN `image`,
    ADD COLUMN `originalName` VARCHAR(191) NULL,
    ADD COLUMN `path` VARCHAR(191) NULL;
