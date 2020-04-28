CREATE TABLE votes(
    id SERIAL PRIMARY KEY,
    upvote BOOLEAN DEFAULT false,
    downvote BOOLEAN DEFAULT false,
    user_id INTEGER REFERENCES users NOT NULL,
    question_id INTEGER REFERENCES questions NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);
