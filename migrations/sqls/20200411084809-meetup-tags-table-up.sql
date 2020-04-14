CREATE TABLE meetup_tags(
    id SERIAL PRIMARY KEY,
    tag_name VARCHAR(20) NOT NULL,
    meetup_id INTEGER REFERENCES meetups,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);
