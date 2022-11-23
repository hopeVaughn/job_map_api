DROP TABLE IF EXISTS contacts CASCADE;
CREATE TABLE contacts(
  id SERIAL PRIMARY KEY NOT NULL,
  user_id UUID NOT NULL,
  name VARCHAR(250),
  image VARCHAR(250),
  linkedin VARCHAR(250),
  github VARCHAR(250),
  twitter VARCHAR(250)
);
