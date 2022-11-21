DROP TABLE IF EXISTS applications CASCADE;
CREATE TABLE applications(
  id SERIAL PRIMARY KEY NOT NULL,
  company_id INT NOT NULL,
  stack VARCHAR(250),
  resume_sent BOOLEAN DEFAULT FALSE,
  resume_sent_date DATE,
  hr_interview BOOLEAN DEFAULT FALSE,
  tech_interview BOOLEAN DEFAULT FALSE,
  job_offer BOOLEAN DEFAULT FALSE,
  front_end BOOLEAN DEFAULT FALSE,
  back_end BOOLEAN DEFAULT FALSE,
  full_stack BOOLEAN DEFAULT FALSE,
  rejected BOOLEAN DEFAULT FALSE
);
-- date fns to search current date vs upcoming dates

