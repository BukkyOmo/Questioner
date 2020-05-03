CREATE TYPE privileges AS ENUM('admin', 'user');

CREATE TABLE users(
    id UUID PRIMARY KEY,
    first_name VARCHAR(20) NOT NULL,
    last_name VARCHAR(20) NOT NULL,
    email VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL,
    password_reset_token TEXT,
    image_url TEXT,
    role privileges DEFAULT 'user',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

INSERT INTO users(id, first_name, last_name, email, password, role) VALUES('37a749da-5f35-4be5-8a1c-e270a790774f', 'Bukola', 'Omosefunmi', 'omosefunmibukola@gmail.com', '$2b$10$XXPj/wj4oPytF5w6moiQFeHQQis5FmcdlJJnsRNchu4YPHTK5fXi2', 'admin');
