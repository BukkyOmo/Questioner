CREATE TYPE status AS ENUM('succeeded', 'failed');

CREATE TABLE login_logs(
    id SERIAL PRIMARY KEY,
    email VARCHAR(50) UNIQUE NOT NULL,
    login_status status NOT NULL,
    longitude VARCHAR(100),
    latitude VARCHAR(100),
    craeted_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);
