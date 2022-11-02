/*
  Warnings:

  - You are about to alter the column `pet_age` on the `petdb` table. The data in that column could be lost. The data in that column will be cast from `UnsignedInt` to `VarChar(10)`.

*/
-- AlterTable
ALTER TABLE `petdb` MODIFY `pet_age` VARCHAR(10) NOT NULL;
