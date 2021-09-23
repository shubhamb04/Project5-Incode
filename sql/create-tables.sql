CREATE TABLE user (
    user_id SERIAL PRIMARY KEY NOT NULL,
    email VARCHAR(100) NOT NULL,
    password VARCHAR(100) NOT NULL,
    UNIQUE (email),
    created_at TIMESTAMPTZ DEFAULT now() 
);

CREATE TABLE rating (
    
)