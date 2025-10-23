CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username_val TEXT,
    email_val TEXT,
    password_val TEXT
);

CREATE TABLE IF NOT EXISTS users_tokens (
    id SERIAL PRIMARY KEY,
    username_log TEXT,
    email_log TEXT,
    token_log TEXT
);

SELECT * FROM users;
SELECT * FROM users_tokens;
