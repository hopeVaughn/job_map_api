--  you must enter 'CREATE EXTENSION IF NOT EXISTS "uuid-ossp";' into the psql server first before running the following postgresql command
DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE users(
    id UUID DEFAULT uuid_generate_v4(),
    name VARCHAR(255),
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);
