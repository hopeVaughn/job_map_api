DROP TABLE IF EXISTS contacts CASCADE;
CREATE TABLE contacts(
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(250),
  network_img VARCHAR(250),
  linkedin VARCHAR(250),
  twitter VARCHAR(250),
  github VARCHAR(250)
)
