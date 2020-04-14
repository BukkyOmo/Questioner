CREATE TYPE response AS ENUM('yes', 'no', 'maybe');

CREATE TABLE reservations(
    id SERIAL PRIMARY KEY,
    user_response response NOT NULL,
    user_id INTEGER REFERENCES users,
    meetup_id INTEGER REFERENCES meetups,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);
