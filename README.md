# Portfolio — Full-Stack Personal Site

Personal portfolio with an AI assistant, a static blog, and a daily wake-up
challenge with a streak leaderboard.

- **Live:** [shivaprasadm.in](https://www.shivaprasadm.in)
- **Frontend:** React 19 + Vite + TypeScript, deployed on Vercel
- **Backend:** Spring Boot 4 (Java 21) + PostgreSQL, deployed on Google Cloud Run

---

## Features

### AI portfolio chat
An assistant that answers questions about my experience, projects, and stack.
The browser never talks to a model provider directly — it calls
`POST /api/ai/chat`, and the backend holds the keys and builds the prompt from
JSON profile files in `src/main/resources/ai/profile/`.

Resilience is handled by `FallbackAiClient`:

- **Key pool** — `GEMINI_API_KEYS` / `OPENROUTER_API_KEYS` accept comma-separated
  keys. A key that returns HTTP 429 is benched for an hour and the next one is used.
- **Provider fallback** — when every Gemini key is rate-limited, requests fail over
  to OpenRouter. If that is exhausted too, the user gets a friendly message rather
  than an error.
- **Rate limiting** — `/api/ai/**` is capped per client IP (Bucket4j), so the
  endpoint can't be used as a free, unmetered proxy to my API quota.

### Wake-up challenge
Check in daily between **5:00–7:00 AM IST** to build a streak.

- The window is enforced **server-side**; the client countdown is only a display.
- A rotating verification question (one per IST day) gates submission. The API
  returns the question text only — never the stored answer hash.
- `POST /api/challenges/checkin` is rate limited, and a unique constraint on
  `(participation_id, check_in_date)` makes a double check-in impossible even
  under concurrent requests.

### Blog
Posts are authored in `portfolio-ui/src/data/blogs.ts` and render as static
content with `react-markdown`. There is no blog backend and no editor — a post is
a code change plus a deploy.

---

## Architecture

```
portfolio/
├── portfolio-ui/          React 19 + Vite frontend
│   └── src/
│       ├── app/           routing, layouts, providers
│       ├── features/      ai · blog · challenge · user
│       ├── shared/        UI primitives, apiClient, stores, hooks
│       └── data/          static content (blogs, projects, videos)
└── portfolio-backend/     Spring Boot 4 API
    └── src/main/java/com/portfolio_backend/
        ├── ai/            controller → service → client (Gemini / OpenRouter)
        ├── checkin/       controller → service → repository
        ├── user/          user entity + repository
        └── common/        config, interceptors, exception handling, utils
```

### API

| Method | Endpoint                     | Purpose                                   |
| ------ | ---------------------------- | ----------------------------------------- |
| `GET`  | `/api/health`                | Liveness probe                            |
| `POST` | `/api/ai/chat`               | Portfolio assistant (rate limited)        |
| `GET`  | `/api/challenges/question`   | Today's verification question             |
| `GET`  | `/api/challenges/leaderboard`| Active streaks, ranked                    |
| `POST` | `/api/challenges/checkin`    | Submit a check-in (rate limited)          |

All endpoints are public and read-mostly. There is no authentication layer
because there is nothing to authenticate — no admin surface, and no endpoint
that exposes or mutates another person's data.

### Database

Flyway owns the schema in every environment.

- `V1__init.sql` — tables, all `CREATE TABLE IF NOT EXISTS`
- `V2__insert_questions.sql` — seeds verification questions, only when the table is empty

Both are idempotent, and `baseline-version=2` means an existing database is
recorded as already at V2 rather than having the migrations replayed against it.

---

## Running locally

**Prerequisites:** Java 21, Node 18+, PostgreSQL 14+

### Backend

```bash
createdb portfolio
cd portfolio-backend
cp .env.example .env      # fill in DB_PASSWORD and at least one AI key
./mvnw spring-boot:run    # starts on :8080, Flyway creates and seeds the schema
```

### Frontend

```bash
cd portfolio-ui
cp .env.example .env      # VITE_API_BASE_URL=http://localhost:8080
npm install
npm run dev               # starts on :5173
```

`http://localhost:5173` is in the backend's default CORS allowlist. Override it
with `CORS_ALLOWED_ORIGINS` if you run the UI on a different port.

To exercise the check-in form outside the 5–7 AM window, set
`VITE_TEST_MODE=true` — note this only relaxes the **client-side** gate; the
server still rejects out-of-window submissions.

### Checks

```bash
cd portfolio-backend && ./mvnw test
cd portfolio-ui && npx tsc -b && npm run lint && npm run build
```

---

## Configuration

Secrets live in `.env` files, which are gitignored. `.env.example` in each
project lists what is needed.

**Backend**

| Variable                                | Notes                                        |
| --------------------------------------- | -------------------------------------------- |
| `DATABASE_URL`                          | JDBC URL; carries credentials in production   |
| `DB_USERNAME` / `DB_PASSWORD`           | Local development only                        |
| `GEMINI_API_KEY` / `GEMINI_API_KEYS`    | Single key, or a comma-separated pool         |
| `OPENROUTER_API_KEY` / `..._KEYS`       | Fallback provider                             |
| `AI_PROVIDER`                           | `fallback` (default), `gemini`, `openrouter`  |
| `CORS_ALLOWED_ORIGINS`                  | Comma-separated origin allowlist              |

**Frontend** — every `VITE_`-prefixed value is inlined into the public JS bundle,
so never put a secret there.

| Variable             | Notes                                              |
| -------------------- | -------------------------------------------------- |
| `VITE_API_BASE_URL`  | Backend origin                                     |
| `VITE_TEST_MODE`     | `true` bypasses the client-side check-in window     |

---

## Deployment

- **Frontend** — Vercel, built from `portfolio-ui`. Security headers and the SPA
  rewrite are in `vercel.json`.
- **Backend** — Cloud Run, from the multi-stage `Dockerfile` (JRE runtime, runs as
  an unprivileged user). `.dockerignore` keeps `.env`, `.git` and `target/` out of
  the image.
