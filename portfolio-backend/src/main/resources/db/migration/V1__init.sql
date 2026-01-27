
CREATE DATABASE IF NOT EXISTS `portfolio` DEFAULT CHARACTER SET `UTF8MB4` COLLATE `UTF8MB4_UNICODE_CI`;

USE `portfolio`;

-- 1. USERS
DROP TABLE IF EXISTS `portfolio`.`users`;
CREATE TABLE `portfolio`.`users` (
    `ID`             BIGINT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'Primary key.',
    `EMAIL`          VARCHAR(255)   NOT NULL COMMENT 'User email address.',
    `NAME`           VARCHAR(255)   NOT NULL COMMENT 'User full name.',
    `PASSWORD_HASH`  TEXT           NULL COMMENT 'Hashed password.',
    `LAST_LOGIN_AT`  TIMESTAMP      NULL COMMENT 'Last login time.',
    `IS_ACTIVE`      TINYINT        NOT NULL DEFAULT 1 COMMENT 'Status of the user.',
    `CREATED_AT`     TIMESTAMP      NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Time when this record was created.',
    `UPDATED_AT`     TIMESTAMP      NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Time when this record was last updated.',
    PRIMARY KEY (`ID`),
    UNIQUE KEY `UK_USERS_EMAIL` (`EMAIL`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 2. VERIFICATION QUESTIONS
DROP TABLE IF EXISTS `portfolio`.`verification_questions`;
CREATE TABLE `portfolio`.`verification_questions` (
    `ID`                   BIGINT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'Primary key.',
    `QUESTION`             TEXT           NOT NULL COMMENT 'Question text.',
    `ANSWER_HASH`          VARCHAR(64)    NOT NULL COMMENT 'SHA-256 hash of the answer.',
    `PLACEHOLDER`          VARCHAR(255)   NULL COMMENT 'Input placeholder hint.',
    `DIFFICULTY`           INT            NOT NULL DEFAULT 1 COMMENT 'Difficulty level.',
    `IS_ACTIVE`            TINYINT        NOT NULL DEFAULT 1 COMMENT 'Flag for active status.',
    `CREATED_AT`           TIMESTAMP      NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Time when this record was created.',
    `UPDATED_AT`           TIMESTAMP      NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Time when this record was last updated.',
    PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 3. USER PARTICIPATION
DROP TABLE IF EXISTS `portfolio`.`user_participation`;
CREATE TABLE `portfolio`.`user_participation` (
    `ID`              BIGINT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'Primary key.',
    `USER_ID`         BIGINT UNSIGNED NOT NULL COMMENT 'ID of the user associated with this participation.',
    `CURRENT_STREAK`  INT            NOT NULL DEFAULT 0 COMMENT 'Current check-in streak.',
    `LONGEST_STREAK`  INT            NOT NULL DEFAULT 0 COMMENT 'Longest check-in streak.',
    `LAST_CHECK_IN`   TIMESTAMP      NULL COMMENT 'Timestamp of last check-in.',
    `TOTAL_CHECK_INS` INT            NOT NULL DEFAULT 0 COMMENT 'Total number of check-ins.',
    `STATUS`          VARCHAR(30)    NOT NULL DEFAULT 'ACTIVE' COMMENT 'Status of the participation.',
    `IS_ACTIVE`       TINYINT        NOT NULL DEFAULT 1 COMMENT 'Flag for active status.',
    `CREATED_AT`      TIMESTAMP      NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Time when this record was created.',
    `UPDATED_AT`      TIMESTAMP      NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Time when this record was last updated.',
    PRIMARY KEY (`ID`),
    UNIQUE KEY `UK_USER_PARTICIPATION` (`USER_ID`),
    CONSTRAINT `FK_PARTICIPATION_USER` FOREIGN KEY (`USER_ID`) REFERENCES `users` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 4. DAILY CHECK-INS
DROP TABLE IF EXISTS `portfolio`.`daily_check_ins`;
CREATE TABLE `portfolio`.`daily_check_ins` (
    `ID`                BIGINT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'Primary key.',
    `PARTICIPATION_ID`  BIGINT UNSIGNED NOT NULL COMMENT 'ID of the participation associated with this check-in.',
    `CHECK_IN_DATE`     DATE           NOT NULL COMMENT 'Date of the check-in.',
    `VERIFIED`          TINYINT        NOT NULL DEFAULT 1 COMMENT 'Flag to check if this check-in is verified.',
    `IS_ACTIVE`         TINYINT        NOT NULL DEFAULT 1 COMMENT 'Flag for active status.',
    `CREATED_AT`        TIMESTAMP      NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Time when this record was created.',
    `UPDATED_AT`        TIMESTAMP      NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Time when this record was last updated.',
    PRIMARY KEY (`ID`),
    UNIQUE KEY `UK_DAILY_CHECKIN` (`PARTICIPATION_ID`, `CHECK_IN_DATE`),
    CONSTRAINT `FK_CHECKIN_PARTICIPATION` FOREIGN KEY (`PARTICIPATION_ID`) REFERENCES `user_participation` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
