/*
  Warnings:

  - A unique constraint covering the columns `[user_name]` on the table `userdb` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `userdb` MODIFY `user_name` VARCHAR(20) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `user_name` ON `userdb`(`user_name`);
