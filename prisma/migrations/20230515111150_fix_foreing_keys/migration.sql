/*
  Warnings:

  - You are about to drop the column `question_id` on the `Option` table. All the data in the column will be lost.
  - You are about to drop the column `question_id` on the `Progress` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `Progress` table. All the data in the column will be lost.
  - Added the required column `questionId` to the `Option` table without a default value. This is not possible if the table is not empty.
  - Added the required column `questionId` to the `Progress` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Progress` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Option` DROP FOREIGN KEY `Option_question_id_fkey`;

-- DropForeignKey
ALTER TABLE `Progress` DROP FOREIGN KEY `Progress_question_id_fkey`;

-- DropForeignKey
ALTER TABLE `Progress` DROP FOREIGN KEY `Progress_user_id_fkey`;

-- AlterTable
ALTER TABLE `Option` DROP COLUMN `question_id`,
    ADD COLUMN `questionId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `Progress` DROP COLUMN `question_id`,
    DROP COLUMN `user_id`,
    ADD COLUMN `questionId` INTEGER NOT NULL,
    ADD COLUMN `userId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Option` ADD CONSTRAINT `Option_questionId_fkey` FOREIGN KEY (`questionId`) REFERENCES `Question`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Progress` ADD CONSTRAINT `Progress_questionId_fkey` FOREIGN KEY (`questionId`) REFERENCES `Question`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Progress` ADD CONSTRAINT `Progress_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
