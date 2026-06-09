-- Mjeshtri marketplace schema (MySQL 8 / MariaDB 10.4+)
-- Charset utf8mb4 so Albanian diacritics (ë, ç) and emoji store correctly.
-- Run via:  npm run db:schema   (drops + recreates all tables)

SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS reviews;
DROP TABLE IF EXISTS bids;
DROP TABLE IF EXISTS jobs;
DROP TABLE IF EXISTS professionals;
DROP TABLE IF EXISTS users;
SET FOREIGN_KEY_CHECKS = 1;

-- ---------------------------------------------------------------------------
-- users — one row per account (customer | professional | admin)
-- ---------------------------------------------------------------------------
CREATE TABLE users (
  id            VARCHAR(40)  NOT NULL PRIMARY KEY,
  role          ENUM('customer','professional','admin') NOT NULL,
  name          VARCHAR(160) NOT NULL,
  email         VARCHAR(190) NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  phone         VARCHAR(40)  NULL,
  area          VARCHAR(120) NULL,
  created_at    DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY uq_users_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------------------
-- professionals — profile data; id == users.id (1:1 with a professional user)
-- ---------------------------------------------------------------------------
CREATE TABLE professionals (
  id             VARCHAR(40)  NOT NULL PRIMARY KEY,
  slug           VARCHAR(190) NOT NULL,
  category       VARCHAR(80)  NOT NULL,
  city           VARCHAR(120) NOT NULL DEFAULT 'Tiranë',
  areas          JSON         NULL,
  experience     INT          NOT NULL DEFAULT 0,
  business       VARCHAR(160) NULL,
  nipt           VARCHAR(40)  NULL,
  bio            TEXT         NULL,
  skills         JSON         NULL,
  portfolio      JSON         NULL,
  avatar_url     VARCHAR(400) NULL,
  response_time  VARCHAR(80)  NULL,
  availability   VARCHAR(80)  NULL,
  -- denormalised rating cache, recomputed when reviews change
  rating         DECIMAL(3,2) NOT NULL DEFAULT 0,
  reviews_count  INT          NOT NULL DEFAULT 0,
  completed_jobs INT          NOT NULL DEFAULT 0,
  verified       TINYINT(1)   NOT NULL DEFAULT 0,
  featured       TINYINT(1)   NOT NULL DEFAULT 0,
  -- moderation lifecycle for admin approval queue
  status         ENUM('pending','approved','rejected') NOT NULL DEFAULT 'pending',
  created_at     DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY uq_pro_slug (slug),
  KEY idx_pro_category (category),
  KEY idx_pro_status (status),
  CONSTRAINT fk_pro_user FOREIGN KEY (id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------------------
-- jobs — customer service requests
-- ---------------------------------------------------------------------------
CREATE TABLE jobs (
  id              VARCHAR(40)  NOT NULL PRIMARY KEY,
  customer_id     VARCHAR(40)  NOT NULL,
  category        VARCHAR(80)  NOT NULL,
  area            VARCHAR(120) NOT NULL,
  title           VARCHAR(200) NOT NULL,
  description     TEXT         NOT NULL,
  urgency         VARCHAR(40)  NULL,
  budget          VARCHAR(80)  NULL,
  contact         VARCHAR(40)  NULL,
  photos          JSON         NULL,
  status          ENUM('Pending','Open for Bids','In Progress','Completed','Cancelled')
                    NOT NULL DEFAULT 'Open for Bids',
  selected_pro_id VARCHAR(40)  NULL,
  reviewed        TINYINT(1)   NOT NULL DEFAULT 0,
  posted_at       DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  completed_at    DATETIME     NULL,
  KEY idx_jobs_customer (customer_id),
  KEY idx_jobs_status (status),
  KEY idx_jobs_category (category),
  CONSTRAINT fk_jobs_customer FOREIGN KEY (customer_id) REFERENCES users(id) ON DELETE CASCADE,
  CONSTRAINT fk_jobs_pro FOREIGN KEY (selected_pro_id) REFERENCES professionals(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------------------
-- bids — a professional's offer on a job
-- ---------------------------------------------------------------------------
CREATE TABLE bids (
  id          VARCHAR(40)  NOT NULL PRIMARY KEY,
  job_id      VARCHAR(40)  NOT NULL,
  pro_id      VARCHAR(40)  NOT NULL,
  price       INT          NOT NULL,
  arrival     VARCHAR(120) NULL,
  completion  VARCHAR(120) NULL,
  label       VARCHAR(120) NULL,
  message     TEXT         NULL,
  status      ENUM('pending','accepted','rejected') NOT NULL DEFAULT 'pending',
  created_at  DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  KEY idx_bids_job (job_id),
  KEY idx_bids_pro (pro_id),
  -- a professional can only bid once per job
  UNIQUE KEY uq_bid_job_pro (job_id, pro_id),
  CONSTRAINT fk_bids_job FOREIGN KEY (job_id) REFERENCES jobs(id) ON DELETE CASCADE,
  CONSTRAINT fk_bids_pro FOREIGN KEY (pro_id) REFERENCES professionals(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------------------
-- reviews — left by a customer for a professional (optionally tied to a job)
-- ---------------------------------------------------------------------------
CREATE TABLE reviews (
  id            VARCHAR(40)  NOT NULL PRIMARY KEY,
  pro_id        VARCHAR(40)  NOT NULL,
  job_id        VARCHAR(40)  NULL,
  customer_id   VARCHAR(40)  NULL,
  customer_name VARCHAR(160) NOT NULL,
  area          VARCHAR(120) NULL,
  rating        TINYINT      NOT NULL,
  text          TEXT         NULL,
  breakdown     JSON         NULL,
  created_at    DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  KEY idx_reviews_pro (pro_id),
  CONSTRAINT fk_reviews_pro FOREIGN KEY (pro_id) REFERENCES professionals(id) ON DELETE CASCADE,
  CONSTRAINT fk_reviews_job FOREIGN KEY (job_id) REFERENCES jobs(id) ON DELETE SET NULL,
  CONSTRAINT fk_reviews_customer FOREIGN KEY (customer_id) REFERENCES users(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
