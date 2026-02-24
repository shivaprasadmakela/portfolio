-- =============================================================================
-- V3: EdTech Interview Platform - Complete Schema (PostgreSQL)
-- =============================================================================

-- Drop in correct order (respecting FK dependencies)
DROP TABLE IF EXISTS question_tags CASCADE;
DROP TABLE IF EXISTS question_collections CASCADE;
DROP TABLE IF EXISTS questions CASCADE;
DROP TABLE IF EXISTS collections CASCADE;
DROP TABLE IF EXISTS collection_types CASCADE;
DROP TABLE IF EXISTS tags CASCADE;

-- =============================================================================
-- 1. COLLECTION TYPES
-- =============================================================================
CREATE TABLE collection_types (
    id   INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL
);

-- =============================================================================
-- 2. QUESTIONS
-- =============================================================================
CREATE TABLE questions (
    id           BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    title        VARCHAR(255) NOT NULL,
    slug         VARCHAR(255) UNIQUE,
    summary      TEXT DEFAULT NULL,
    content_html TEXT DEFAULT NULL,
    solution_md  TEXT DEFAULT NULL,
    difficulty   VARCHAR(10) NOT NULL DEFAULT 'MEDIUM'
                     CHECK (difficulty IN ('EASY', 'MEDIUM', 'HARD')),
    status       VARCHAR(10) NOT NULL DEFAULT 'DRAFT'
                     CHECK (status IN ('DRAFT', 'PUBLISHED', 'ARCHIVED')),
    views        BIGINT DEFAULT 0,
    created_by   BIGINT NULL REFERENCES users(id) ON DELETE SET NULL,
    created_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_question_status     ON questions (status);
CREATE INDEX idx_question_difficulty ON questions (difficulty);
CREATE INDEX idx_question_created_by ON questions (created_by);

-- =============================================================================
-- 3. COLLECTIONS
-- =============================================================================
CREATE TABLE collections (
    id            BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name          VARCHAR(255) NOT NULL,
    slug          VARCHAR(255) UNIQUE,
    description   TEXT DEFAULT NULL,
    thumbnail_url VARCHAR(512) DEFAULT NULL,
    icon          VARCHAR(50) DEFAULT NULL,
    video_id      VARCHAR(50) DEFAULT NULL,
    publish_date  DATE DEFAULT NULL,
    type_id       INT NOT NULL REFERENCES collection_types(id) ON DELETE RESTRICT,
    status        VARCHAR(10) NOT NULL DEFAULT 'PUBLISHED'
                      CHECK (status IN ('DRAFT', 'PUBLISHED', 'ARCHIVED')),
    created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_collection_type        ON collections (type_id);
CREATE INDEX idx_collection_status      ON collections (status);
CREATE INDEX idx_collection_type_status ON collections (type_id, status);

-- =============================================================================
-- 4. QUESTION_COLLECTIONS (JOIN TABLE)
-- =============================================================================
CREATE TABLE question_collections (
    question_id   BIGINT NOT NULL REFERENCES questions(id) ON DELETE CASCADE,
    collection_id BIGINT NOT NULL REFERENCES collections(id) ON DELETE CASCADE,
    order_index   INT NOT NULL DEFAULT 0,
    PRIMARY KEY (question_id, collection_id)
);

CREATE INDEX idx_qc_collection ON question_collections (collection_id);
CREATE INDEX idx_qc_order      ON question_collections (collection_id, order_index);

-- =============================================================================
-- 5. TAGS
-- =============================================================================
CREATE TABLE tags (
    id         INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name       VARCHAR(50) UNIQUE NOT NULL,
    slug       VARCHAR(100) UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =============================================================================
-- 6. QUESTION_TAGS (JOIN TABLE)
-- =============================================================================
CREATE TABLE question_tags (
    question_id BIGINT NOT NULL REFERENCES questions(id) ON DELETE CASCADE,
    tag_id      INT    NOT NULL REFERENCES tags(id) ON DELETE CASCADE,
    PRIMARY KEY (question_id, tag_id)
);

CREATE INDEX idx_qt_tag ON question_tags (tag_id);

-- =============================================================================
-- SEED CORE DATA
-- =============================================================================
INSERT INTO collection_types (name)
VALUES ('CATEGORY'), ('YOUTUBE_SET'), ('LEARNING_PATH')
ON CONFLICT (name) DO NOTHING;
