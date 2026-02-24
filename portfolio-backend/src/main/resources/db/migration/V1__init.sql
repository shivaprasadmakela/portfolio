
-- 1. USERS
DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE users (
    id              BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    email           VARCHAR(255)    NOT NULL UNIQUE,
    name            VARCHAR(255)    NOT NULL,
    password_hash   TEXT            NULL,
    last_login_at   TIMESTAMP       NULL,
    is_active       BOOLEAN         NOT NULL DEFAULT TRUE,
    role            VARCHAR(10)     NOT NULL DEFAULT 'USER'
                        CHECK (role IN ('ADMIN', 'USER')),
    created_at      TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at      TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 2. VERIFICATION QUESTIONS
DROP TABLE IF EXISTS verification_questions CASCADE;
CREATE TABLE verification_questions (
    id           BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    question     TEXT            NOT NULL,
    answer_hash  VARCHAR(64)     NOT NULL,
    placeholder  VARCHAR(255)    NULL,
    difficulty   INT             NOT NULL DEFAULT 1,
    is_active    BOOLEAN         NOT NULL DEFAULT TRUE,
    created_at   TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at   TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 3. USER PARTICIPATION
DROP TABLE IF EXISTS user_participation CASCADE;
CREATE TABLE user_participation (
    id               BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    user_id          BIGINT          NOT NULL UNIQUE,
    current_streak   INT             NOT NULL DEFAULT 0,
    longest_streak   INT             NOT NULL DEFAULT 0,
    last_check_in    TIMESTAMP       NULL,
    total_check_ins  INT             NOT NULL DEFAULT 0,
    status           VARCHAR(30)     NOT NULL DEFAULT 'ACTIVE',
    is_active        BOOLEAN         NOT NULL DEFAULT TRUE,
    created_at       TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at       TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_participation_user FOREIGN KEY (user_id) REFERENCES users (id)
);

-- 4. DAILY CHECK-INS
DROP TABLE IF EXISTS daily_check_ins CASCADE;
CREATE TABLE daily_check_ins (
    id                BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    participation_id  BIGINT          NOT NULL,
    check_in_date     DATE            NOT NULL,
    verified          BOOLEAN         NOT NULL DEFAULT TRUE,
    is_active         BOOLEAN         NOT NULL DEFAULT TRUE,
    created_at        TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at        TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uk_daily_checkin UNIQUE (participation_id, check_in_date),
    CONSTRAINT fk_checkin_participation FOREIGN KEY (participation_id) REFERENCES user_participation (id)
);
