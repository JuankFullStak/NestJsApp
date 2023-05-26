-- AlterTable
ALTER TABLE `Option` ADD COLUMN `originalName` VARCHAR(191) NULL,
    ADD COLUMN `path` VARCHAR(191) NULL,
    MODIFY `body` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `Question` ADD COLUMN `originalName` VARCHAR(191) NULL,
    ADD COLUMN `path` VARCHAR(191) NULL;
