DROP TABLE IF EXISTS companies CASCADE;
CREATE TABLE companies(
  id SERIAL PRIMARY KEY NOT NULL,
  user_id UUID NOT NULL,
  name VARCHAR(250) NOT NULL,
  network_id INT
  );
-- application table for ...resume.info
