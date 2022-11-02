/*
  Warnings:

  - A unique constraint covering the columns `[user_id,post_id]` on the table `likesdb` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `likesdb_user_id_post_id_key` ON `likesdb`(`user_id`, `post_id`);
