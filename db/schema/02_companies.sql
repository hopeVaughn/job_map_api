DROP TABLE IF EXISTS companies CASCADE;
CREATE TABLE companies(
  id SERIAL PRIMARY KEY NOT NULL,
  user_id UUID NOT NULL,
  name VARCHAR(250) NOT NULL,
  stack VARCHAR(250),
  front_end BOOLEAN DEFAULT FALSE,
  back_end BOOLEAN DEFAULT FALSE,
  full_stack BOOLEAN DEFAULT FALSE
  );
-- application table for ...resume.info
