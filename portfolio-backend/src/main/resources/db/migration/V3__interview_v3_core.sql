USE `portfolio`;

-- =============================================================================
-- V3: EdTech Interview Platform - Complete Schema
-- =============================================================================

-- =============================================================================
-- 1. COLLECTION TYPES
-- =============================================================================
DROP TABLE IF EXISTS `portfolio`.`collection_types`;
CREATE TABLE `portfolio`.`collection_types` (
    `ID`   INT NOT NULL AUTO_INCREMENT COMMENT 'Primary key.',
    `NAME` VARCHAR(50) UNIQUE NOT NULL COMMENT 'Name of the collection type (e.g., CATEGORY, YOUTUBE_SET, LEARNING_PATH).',
    PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Defines various types of interview collections.';

-- =============================================================================
-- 2. QUESTIONS
-- =============================================================================
DROP TABLE IF EXISTS `portfolio`.`questions`;
CREATE TABLE `portfolio`.`questions` (
    `ID`           BIGINT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'Primary key.',
    `TITLE`        VARCHAR(255) NOT NULL COMMENT 'Question title.',
    `SLUG`         VARCHAR(255) UNIQUE NULL COMMENT 'SEO-friendly URL slug.',
    `SUMMARY`      TEXT DEFAULT NULL COMMENT 'Brief summary or hint for the question.',
    `CONTENT_HTML` LONGTEXT DEFAULT NULL COMMENT 'In-depth description or problem statement in HTML.',
    `SOLUTION_MD`  LONGTEXT DEFAULT NULL COMMENT 'Detailed solution or explanation in Markdown.',
    `DIFFICULTY`   ENUM('EASY', 'MEDIUM', 'HARD') NOT NULL DEFAULT 'MEDIUM' COMMENT 'Question difficulty level.',
    `STATUS`       ENUM('DRAFT', 'PUBLISHED', 'ARCHIVED') NOT NULL DEFAULT 'DRAFT' COMMENT 'Publication status.',
    `VIEWS`        BIGINT UNSIGNED DEFAULT 0 COMMENT 'Total views for this question.',
    `CREATED_BY`   BIGINT UNSIGNED NULL COMMENT 'User who created this question.',
    `CREATED_AT`   TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT 'Timestamp when created.',
    `UPDATED_AT`   TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Timestamp when last updated.',
    PRIMARY KEY (`ID`),
    KEY `UK_QUESTIONS_SLUG` (`SLUG`),
    KEY `IDX_QUESTION_STATUS` (`STATUS`),
    KEY `IDX_QUESTION_DIFFICULTY` (`DIFFICULTY`),
    KEY `IDX_QUESTION_CREATED_BY` (`CREATED_BY`),
    CONSTRAINT `FK_QUESTION_CREATOR` FOREIGN KEY (`CREATED_BY`) REFERENCES `users` (`ID`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Master table for all interview questions.';

-- =============================================================================
-- 3. COLLECTIONS
-- =============================================================================
DROP TABLE IF EXISTS `portfolio`.`collections`;
CREATE TABLE `portfolio`.`collections` (
    `ID`            BIGINT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'Primary key.',
    `NAME`          VARCHAR(255) NOT NULL COMMENT 'Display name of the collection.',
    `SLUG`          VARCHAR(255) UNIQUE NULL COMMENT 'SEO-friendly URL slug.',
    `DESCRIPTION`   TEXT DEFAULT NULL COMMENT 'Optional description of the collection.',
    `THUMBNAIL_URL` VARCHAR(512) DEFAULT NULL COMMENT 'URL for the collection cover image.',
    `ICON`          VARCHAR(50) DEFAULT NULL COMMENT 'Icon identifier for categories.',
    `VIDEO_ID`      VARCHAR(50) DEFAULT NULL COMMENT 'YouTube video ID for sets.',
    `PUBLISH_DATE`  DATE DEFAULT NULL COMMENT 'Optional date for set releases.',
    `TYPE_ID`       INT NOT NULL COMMENT 'Reference to the collection type.',
    `STATUS`        ENUM('DRAFT', 'PUBLISHED', 'ARCHIVED') NOT NULL DEFAULT 'PUBLISHED' COMMENT 'Publication status.',
    `CREATED_AT`    TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT 'Timestamp when created.',
    `UPDATED_AT`    TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Timestamp when last updated.',
    PRIMARY KEY (`ID`),
    KEY `UK_COLLECTIONS_SLUG` (`SLUG`),
    KEY `IDX_COLLECTION_TYPE` (`TYPE_ID`),
    KEY `IDX_COLLECTION_STATUS` (`STATUS`),
    KEY `IDX_COLLECTION_TYPE_STATUS` (`TYPE_ID`, `STATUS`),
    CONSTRAINT `FK_COLLECTION_TYPE` FOREIGN KEY (`TYPE_ID`) REFERENCES `collection_types` (`ID`) ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Groups of questions like Category topics or YouTube sets.';

-- =============================================================================
-- 4. QUESTION_COLLECTIONS (JOIN TABLE)
-- =============================================================================
DROP TABLE IF EXISTS `portfolio`.`question_collections`;
CREATE TABLE `portfolio`.`question_collections` (
    `QUESTION_ID`   BIGINT UNSIGNED NOT NULL COMMENT 'Reference to question.',
    `COLLECTION_ID` BIGINT UNSIGNED NOT NULL COMMENT 'Reference to collection.',
    `ORDER_INDEX`   INT NOT NULL DEFAULT 0 COMMENT 'Display order within the collection.',
    PRIMARY KEY (`QUESTION_ID`, `COLLECTION_ID`),
    KEY `IDX_QC_COLLECTION` (`COLLECTION_ID`),
    KEY `IDX_QC_ORDER` (`COLLECTION_ID`, `ORDER_INDEX`),
    CONSTRAINT `FK_QC_QUESTION` FOREIGN KEY (`QUESTION_ID`) REFERENCES `questions` (`ID`) ON DELETE CASCADE,
    CONSTRAINT `FK_QC_COLLECTION` FOREIGN KEY (`COLLECTION_ID`) REFERENCES `collections` (`ID`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Pivot table linking questions to collections with ordering.';

-- =============================================================================
-- 5. TAGS
-- =============================================================================
DROP TABLE IF EXISTS `portfolio`.`tags`;
CREATE TABLE `portfolio`.`tags` (
    `ID`         INT NOT NULL AUTO_INCREMENT COMMENT 'Primary key.',
    `NAME`       VARCHAR(50) UNIQUE NOT NULL COMMENT 'Tag name (e.g., React, Java).',
    `SLUG`       VARCHAR(100) UNIQUE NULL COMMENT 'SEO-friendly URL slug.',
    `CREATED_AT` TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT 'Timestamp when created.',
    PRIMARY KEY (`ID`),
    KEY `UK_TAGS_SLUG` (`SLUG`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Simple tags for filtering questions.';

-- =============================================================================
-- 6. QUESTION_TAGS (JOIN TABLE)
-- =============================================================================
DROP TABLE IF EXISTS `portfolio`.`question_tags`;
CREATE TABLE `portfolio`.`question_tags` (
    `QUESTION_ID` BIGINT UNSIGNED NOT NULL COMMENT 'Reference to question.',
    `TAG_ID`      INT NOT NULL COMMENT 'Reference to tag.',
    PRIMARY KEY (`QUESTION_ID`, `TAG_ID`),
    KEY `IDX_QT_TAG` (`TAG_ID`),
    CONSTRAINT `FK_QT_QUESTION` FOREIGN KEY (`QUESTION_ID`) REFERENCES `questions` (`ID`) ON DELETE CASCADE,
    CONSTRAINT `FK_QT_TAG`      FOREIGN KEY (`TAG_ID`)      REFERENCES `tags` (`ID`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Pivot table linking questions to tags.';

-- =============================================================================
-- SEED CORE DATA
-- =============================================================================
INSERT IGNORE INTO `collection_types` (`NAME`) 
VALUES ('CATEGORY'), ('YOUTUBE_SET'), ('LEARNING_PATH');
