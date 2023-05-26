-- DropForeignKey
ALTER TABLE `Chapter` DROP FOREIGN KEY `Chapter_categoryId_fkey`;

-- AddForeignKey
ALTER TABLE `Chapter` ADD CONSTRAINT `Chapter_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `Category`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
