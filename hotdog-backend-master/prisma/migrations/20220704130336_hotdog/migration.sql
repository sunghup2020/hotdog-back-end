/*
  Warnings:

  - A unique constraint covering the columns `[user_id]` on the table `petdb` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `id` ON `petdb`(`user_id`);
