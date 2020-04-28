CREATE TABLE questions(
    id SERIAL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    body TEXT NOT NULL,
    user_id INTEGER REFERENCES users NOT NULL,
    meetup_id INTEGER REFERENCES meetups NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);
