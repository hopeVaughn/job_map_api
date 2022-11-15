DROP TABLE IF EXISTS companies CASCADE;
CREATE TABLE companies(
  id SERIAL PRIMARY KEY NOT NULL,
  title VARCHAR(250) NOT NULL,
  category VARCHAR(250) NOT NULL,
  boss VARCHAR(250),
  boss_img VARCHAR(250),
  human_resources VARCHAR(250),
  human_resources_img VARCHAR(250),
  recruiter VARCHAR(250),
  recruiter_img VARCHAR(250),
  network_id INT
  );
-- application table for ...resume.info
