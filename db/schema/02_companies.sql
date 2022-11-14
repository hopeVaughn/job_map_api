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
  stack VARCHAR(250),
  stage INT NOT NULL DEFAULT 0,
  resume_sent BOOLEAN DEFAULT FALSE,
  resume_sent_date DATE,
  hr_interview BOOLEAN DEFAULT FALSE,
  hr_interview_date DATE,
  tech_interview BOOLEAN DEFAULT FALSE,
  tech_interview_date DATE,
  job_offer BOOLEAN DEFAULT FALSE,
  job_offer_date DATE,
  network_id INT
  );
