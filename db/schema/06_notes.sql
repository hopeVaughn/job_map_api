DROP TABLE IF EXISTS notes CASCADE;
CREATE TABLE notes(
  id SERIAL PRIMARY KEY NOT NULL,
  application_id INT NOT NULL,
  note VARCHAR(250)
);
