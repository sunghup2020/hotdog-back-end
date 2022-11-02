/*
  Warnings:

  - You are about to drop the `chatmemberdb` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `chatmemberdb` DROP FOREIGN KEY `chatmemberdb_ibfk_1`;

-- DropForeignKey
ALTER TABLE `chatmemberdb` DROP FOREIGN KEY `chatmemberdb_ibfk_2`;

-- DropTable
DROP TABLE `chatmemberdb`;

-- CreateTable
CREATE TABLE `_chatroomdbTouserdb` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_chatroomdbTouserdb_AB_unique`(`A`, `B`),
    INDEX `_chatroomdbTouserdb_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_chatroomdbTouserdb` ADD CONSTRAINT `_chatroomdbTouserdb_A_fkey` FOREIGN KEY (`A`) REFERENCES `chatroomdb`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_chatroomdbTouserdb` ADD CONSTRAINT `_chatroomdbTouserdb_B_fkey` FOREIGN KEY (`B`) REFERENCES `userdb`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
