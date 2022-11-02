-- CreateTable
CREATE TABLE `chatmemberdb` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `chatroom_id` INTEGER NOT NULL,
    `user_id` INTEGER NOT NULL,

    UNIQUE INDEX `chatroom_id`(`chatroom_id`),
    INDEX `user_id`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `chatmessagedb` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `chatroom_id` INTEGER NOT NULL,
    `content` TEXT NOT NULL,
    `message_send_date` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `chatroom_id`(`chatroom_id`),
    INDEX `user_id`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `chatroomdb` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `commentdb` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `post_id` INTEGER NOT NULL,
    `content` TEXT NOT NULL,

    INDEX `post_id`(`post_id`),
    INDEX `user_id`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `likesdb` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `post_id` INTEGER NOT NULL,

    INDEX `post_id`(`post_id`),
    INDEX `user_id`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `petdb` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `pet_name` VARCHAR(10) NOT NULL,
    `pet_age` INTEGER UNSIGNED NOT NULL,
    `pet_gender` VARCHAR(2) NOT NULL,
    `pet_kinds` VARCHAR(15) NOT NULL,
    `pet_image` VARCHAR(300) NOT NULL,

    INDEX `user_id`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `postdb` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `post_content` TEXT NULL,
    `post_likes_cnt` INTEGER UNSIGNED NOT NULL DEFAULT 0,
    `post_comments_cnt` INTEGER UNSIGNED NULL DEFAULT 0,
    `post_images` VARCHAR(300) NOT NULL,

    INDEX `user_id`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `profiledb` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,

    INDEX `user_id`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `reviewdb` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `profile_id` INTEGER NOT NULL,
    `review_content` VARCHAR(200) NOT NULL,

    INDEX `profile_id`(`profile_id`),
    INDEX `user_id`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `userdb` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` VARCHAR(15) NOT NULL,
    `user_pw` VARCHAR(15) NOT NULL,
    `user_name` VARCHAR(10) NOT NULL,
    `user_birth` DATE NOT NULL,
    `user_gender` VARCHAR(2) NOT NULL,
    `user_phone` VARCHAR(13) NOT NULL,
    `user_address` VARCHAR(200) NOT NULL,

    UNIQUE INDEX `user_id`(`user_id`),
    UNIQUE INDEX `user_pw`(`user_pw`),
    UNIQUE INDEX `user_phone`(`user_phone`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `chatmemberdb` ADD CONSTRAINT `chatmemberdb_ibfk_1` FOREIGN KEY (`chatroom_id`) REFERENCES `chatroomdb`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `chatmemberdb` ADD CONSTRAINT `chatmemberdb_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `userdb`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `chatmessagedb` ADD CONSTRAINT `chatmessagedb_ibfk_1` FOREIGN KEY (`chatroom_id`) REFERENCES `chatroomdb`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `chatmessagedb` ADD CONSTRAINT `chatmessagedb_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `userdb`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `commentdb` ADD CONSTRAINT `commentdb_ibfk_1` FOREIGN KEY (`post_id`) REFERENCES `postdb`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `commentdb` ADD CONSTRAINT `commentdb_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `userdb`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `likesdb` ADD CONSTRAINT `likesdb_ibfk_1` FOREIGN KEY (`post_id`) REFERENCES `postdb`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `likesdb` ADD CONSTRAINT `likesdb_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `userdb`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `petdb` ADD CONSTRAINT `petdb_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `userdb`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `postdb` ADD CONSTRAINT `postdb_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `userdb`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `profiledb` ADD CONSTRAINT `profiledb_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `userdb`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `reviewdb` ADD CONSTRAINT `reviewdb_ibfk_1` FOREIGN KEY (`profile_id`) REFERENCES `profiledb`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `reviewdb` ADD CONSTRAINT `reviewdb_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `userdb`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;
