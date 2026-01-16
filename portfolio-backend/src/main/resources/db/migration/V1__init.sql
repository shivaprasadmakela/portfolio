CREATE DATABASE IF NOT EXISTS portfolio;
USE portfolio;

CREATE TABLE users (
  id BINARY(16) PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  password_hash TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  last_login_at TIMESTAMP NULL
);

CREATE TABLE challenges (
  id BINARY(16) PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  window_start TIME NOT NULL,
  window_end TIME NOT NULL,
  duration_days INT NOT NULL,
  active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE user_challenge_participation (
  id BINARY(16) PRIMARY KEY,
  user_id BINARY(16) NOT NULL,
  challenge_id BINARY(16) NOT NULL,
  current_streak INT DEFAULT 0,
  longest_streak INT DEFAULT 0,
  last_check_in DATE NULL,
  total_check_ins INT DEFAULT 0,
  status VARCHAR(30) DEFAULT 'ACTIVE',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY uq_user_challenge(user_id, challenge_id),
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (challenge_id) REFERENCES challenges(id)
);

CREATE TABLE daily_check_ins (
  id BINARY(16) PRIMARY KEY,
  participation_id BINARY(16) NOT NULL,
  check_in_date DATE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  verification_passed BOOLEAN DEFAULT TRUE,
  UNIQUE KEY uq_checkin(participation_id, check_in_date),
  FOREIGN KEY (participation_id) REFERENCES user_challenge_participation(id)
);

CREATE TABLE verification_questions (
  id BINARY(16) PRIMARY KEY,
  prompt TEXT NOT NULL,
  correct_answer_hash TEXT NOT NULL,
  difficulty INT DEFAULT 1,
  active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

