--  you must enter 'CREATE EXTENSION IF NOT EXISTS "uuid-ossp";' into the psql server first before running the following postgresql command
DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE users(
    user_id UUID DEFAULT uuid_generate_v4(),
    user_name VARCHAR(255),
    user_email VARCHAR(255) NOT NULL UNIQUE,
    user_password VARCHAR(255) NOT NULL
);
