-- -----------------------------------------------------
-- USERS
-- -----------------------------------------------------

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users`
(
    `ID`             BINARY(16)     NOT NULL COMMENT 'Primary key. UUID stored in binary form.',
    `EMAIL`          VARCHAR(255)   NOT NULL COMMENT 'Unique email identifier for the user.',
    `NAME`           VARCHAR(255)   NOT NULL COMMENT 'Display name of the user.',
    `PASSWORD_HASH`  TEXT           NULL COMMENT 'Hashed password (used later for auth).',
    `CREATED_AT`     TIMESTAMP      NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'User creation time.',
    `LAST_LOGIN_AT`  TIMESTAMP      NULL COMMENT 'Last login timestamp.',

    PRIMARY KEY (`ID`),
    UNIQUE KEY `UK_USERS_EMAIL` (`EMAIL`)
)
ENGINE = InnoDB
DEFAULT CHARSET = `utf8mb4`
COLLATE = `utf8mb4_unicode_ci`;

-- -----------------------------------------------------
-- CHALLENGES
-- -----------------------------------------------------

DROP TABLE IF EXISTS `challenges`;

CREATE TABLE `challenges`
(
    `ID`             BINARY(16)   NOT NULL COMMENT 'Primary key. UUID of the challenge.',
    `TITLE`          VARCHAR(255) NOT NULL COMMENT 'Challenge title.',
    `DESCRIPTION`    TEXT         NULL COMMENT 'Challenge description.',
    `WINDOW_START`   TIME         NOT NULL COMMENT 'Daily submission window start time (IST).',
    `WINDOW_END`     TIME         NOT NULL COMMENT 'Daily submission window end time (IST).',
    `DURATION_DAYS`  INT          NOT NULL COMMENT 'Challenge duration in days.',
    `IS_ACTIVE`      TINYINT      NOT NULL DEFAULT 1 COMMENT 'Is challenge active?',
    `CREATED_AT`     TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Creation timestamp.',

    PRIMARY KEY (`ID`)
)
ENGINE = InnoDB
DEFAULT CHARSET = `utf8mb4`
COLLATE = `utf8mb4_unicode_ci`;

-- -----------------------------------------------------
-- USER CHALLENGE PARTICIPATION
-- -----------------------------------------------------

DROP TABLE IF EXISTS `user_challenge_participation`;

CREATE TABLE `user_challenge_participation`
(
    `ID`              BINARY(16) NOT NULL COMMENT 'Primary key. UUID.',
    `USER_ID`         BINARY(16) NOT NULL COMMENT 'FK → users.ID',
    `CHALLENGE_ID`    BINARY(16) NOT NULL COMMENT 'FK → challenges.ID',
    `CURRENT_STREAK`  INT       NOT NULL DEFAULT 0 COMMENT 'Current active streak.',
    `LONGEST_STREAK`  INT       NOT NULL DEFAULT 0 COMMENT 'Longest streak achieved.',
    `LAST_CHECK_IN`   DATE      NULL COMMENT 'Last successful check-in date (IST).',
    `TOTAL_CHECK_INS` INT       NOT NULL DEFAULT 0 COMMENT 'Total number of check-ins.',
    `STATUS`          VARCHAR(30) NOT NULL DEFAULT 'ACTIVE' COMMENT 'ACTIVE / COMPLETED / BANNED',
    `CREATED_AT`      TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Join timestamp.',

    PRIMARY KEY (`ID`),
    UNIQUE KEY `UK_USER_CHALLENGE` (`USER_ID`, `CHALLENGE_ID`),
    CONSTRAINT `FK_PARTICIPATION_USER`
        FOREIGN KEY (`USER_ID`) REFERENCES `users` (`ID`),
    CONSTRAINT `FK_PARTICIPATION_CHALLENGE`
        FOREIGN KEY (`CHALLENGE_ID`) REFERENCES `challenges` (`ID`)
)
ENGINE = InnoDB
DEFAULT CHARSET = `utf8mb4`
COLLATE = `utf8mb4_unicode_ci`;

-- -----------------------------------------------------
-- DAILY CHECK-INS
-- -----------------------------------------------------

DROP TABLE IF EXISTS `daily_check_ins`;

CREATE TABLE `daily_check_ins`
(
    `ID`                BINARY(16) NOT NULL COMMENT 'Primary key. UUID.',
    `PARTICIPATION_ID`  BINARY(16) NOT NULL COMMENT 'FK → user_challenge_participation.ID',
    `CHECK_IN_DATE`     DATE       NOT NULL COMMENT 'Check-in date (IST).',
    `VERIFIED`          TINYINT    NOT NULL DEFAULT 1 COMMENT 'Was verification successful?',
    `CREATED_AT`        TIMESTAMP  NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Check-in time.',

    PRIMARY KEY (`ID`),
    UNIQUE KEY `UK_DAILY_CHECKIN` (`PARTICIPATION_ID`, `CHECK_IN_DATE`),
    CONSTRAINT `FK_CHECKIN_PARTICIPATION`
        FOREIGN KEY (`PARTICIPATION_ID`) REFERENCES `user_challenge_participation` (`ID`)
)
ENGINE = InnoDB
DEFAULT CHARSET = `utf8mb4`
COLLATE = `utf8mb4_unicode_ci`;

-- -----------------------------------------------------
-- VERIFICATION QUESTIONS
-- -----------------------------------------------------

DROP TABLE IF EXISTS `verification_questions`;

CREATE TABLE `verification_questions`
(
    `ID`                   BINARY(16) NOT NULL COMMENT 'Primary key. UUID.',
    `QUESTION`             TEXT       NOT NULL COMMENT 'Verification question text.',
    `ANSWER_HASH`          VARCHAR(64) NOT NULL COMMENT 'SHA-256 hash of correct answer.',
    `PLACEHOLDER`          VARCHAR(255) NULL COMMENT 'UI placeholder hint.',
    `DIFFICULTY`           INT        NOT NULL DEFAULT 1 COMMENT 'Difficulty level.',
    `IS_ACTIVE`            TINYINT    NOT NULL DEFAULT 1 COMMENT 'Is question active?',
    `CREATED_AT`           TIMESTAMP  NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Creation time.',

    PRIMARY KEY (`ID`)
)
ENGINE = InnoDB
DEFAULT CHARSET = `utf8mb4`
COLLATE = `utf8mb4_unicode_ci`;
