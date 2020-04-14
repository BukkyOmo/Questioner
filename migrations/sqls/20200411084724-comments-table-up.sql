CREATE TABLE comments(
    id SERIAL PRIMARY KEY,
    body TEXT NOT NULL,
    user_id INTEGER REFERENCES users,
    question_id INTEGER REFERENCES questions,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);
