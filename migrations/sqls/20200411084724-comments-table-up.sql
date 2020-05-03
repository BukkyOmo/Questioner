CREATE TABLE comments(
    id SERIAL PRIMARY KEY,
    body TEXT NOT NULL,
    user_id UUID REFERENCES users NOT NULL,
    question_id INTEGER REFERENCES questions NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);
