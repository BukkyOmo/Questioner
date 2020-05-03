CREATE TYPE response AS ENUM('yes', 'no', 'maybe');

CREATE TABLE reservations(
    id SERIAL PRIMARY KEY,
    user_response response DEFAULT 'no' NOT NULL,
    user_id UUID REFERENCES users NOT NULL,
    meetup_id INTEGER REFERENCES meetups NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);
