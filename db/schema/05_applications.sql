DROP TABLE IF EXISTS applications CASCADE;
CREATE TABLE applications(
  id SERIAL PRIMARY KEY NOT NULL,
  resume_sent BOOLEAN DEFAULT FALSE,
  resume_sent_date DATE,
  hr_interview BOOLEAN DEFAULT FALSE,
  hr_interview_date DATE,
  tech_interview BOOLEAN DEFAULT FALSE,
  tech_interview_date DATE,
  job_offer BOOLEAN DEFAULT FALSE,
  job_offer_date DATE,
  stage INT NOT NULL DEFAULT 0,
  stack VARCHAR(250),
  company_id INT NOT NULL,
  user_id INT NOT NULL
);
-- date fns to search current date vs upcoming dates
