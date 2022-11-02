/*
  Warnings:

  - You are about to drop the `chatmemberdb` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `chatmessagedb` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `chatroomdb` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `commentdb` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `likesdb` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `petdb` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `postdb` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `profiledb` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `reviewdb` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `chatmemberdb` DROP FOREIGN KEY `chatmemberdb_ibfk_1`;

-- DropForeignKey
ALTER TABLE `chatmemberdb` DROP FOREIGN KEY `chatmemberdb_ibfk_2`;

-- DropForeignKey
ALTER TABLE `chatmessagedb` DROP FOREIGN KEY `chatmessagedb_ibfk_1`;

-- DropForeignKey
ALTER TABLE `chatmessagedb` DROP FOREIGN KEY `chatmessagedb_ibfk_2`;

-- DropForeignKey
ALTER TABLE `commentdb` DROP FOREIGN KEY `commentdb_ibfk_1`;

-- DropForeignKey
ALTER TABLE `commentdb` DROP FOREIGN KEY `commentdb_ibfk_2`;

-- DropForeignKey
ALTER TABLE `likesdb` DROP FOREIGN KEY `likesdb_ibfk_1`;

-- DropForeignKey
ALTER TABLE `likesdb` DROP FOREIGN KEY `likesdb_ibfk_2`;

-- DropForeignKey
ALTER TABLE `petdb` DROP FOREIGN KEY `petdb_ibfk_1`;

-- DropForeignKey
ALTER TABLE `postdb` DROP FOREIGN KEY `postdb_ibfk_1`;

-- DropForeignKey
ALTER TABLE `profiledb` DROP FOREIGN KEY `profiledb_ibfk_1`;

-- DropForeignKey
ALTER TABLE `reviewdb` DROP FOREIGN KEY `reviewdb_ibfk_1`;

-- DropForeignKey
ALTER TABLE `reviewdb` DROP FOREIGN KEY `reviewdb_ibfk_2`;

-- DropTable
DROP TABLE `chatmemberdb`;

-- DropTable
DROP TABLE `chatmessagedb`;

-- DropTable
DROP TABLE `chatroomdb`;

-- DropTable
DROP TABLE `commentdb`;

-- DropTable
DROP TABLE `likesdb`;

-- DropTable
DROP TABLE `petdb`;

-- DropTable
DROP TABLE `postdb`;

-- DropTable
DROP TABLE `profiledb`;

-- DropTable
DROP TABLE `reviewdb`;
