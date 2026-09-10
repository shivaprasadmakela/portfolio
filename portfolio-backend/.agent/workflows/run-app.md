---
description: How to run the portfolio-backend application
---

1. Ensure you have Java 21 and Maven installed.
2. Ensure PostgreSQL is running on localhost:5432 with a `portfolio` database.
3. Set `DB_USERNAME` and `DB_PASSWORD` in `portfolio-backend/.env` (gitignored).
   Flyway creates and seeds the schema on first start.
4. Run the following command in the terminal:
// turbo
./mvnw spring-boot:run
