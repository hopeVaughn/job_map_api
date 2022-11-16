const express = require('express');
const router = express.Router();


module.exports = (db) => {

  // get all info on Resumes sent, Hr Interviews, Tech Interview, Job Offers
  router.get('/', async (req, res) => {
    const resumeSentQuery = `SELECT * FROM applications WHERE resume_sent = TRUE;`
    const hrInterviewQuery = `SELECT * FROM applications WHERE hr_interview = TRUE;`
    const techInterviewQuery = `SELECT * FROM applications WHERE tech_interview = TRUE;`
    const offerQuery = `SELECT * FROM applications WHERE job_offer = TRUE;`
    try {
      const resume = await db.query(resumeSentQuery);
      const hrInterview = await db.query(hrInterviewQuery);
      const techInterview = await db.query(techInterviewQuery);
      const jobOffer = await db.query(offerQuery);
      // res.json(resume.rows.length)
      // res.json(hrInterview.rows.length)
      // res.json(techInterview.rows.length)
      res.json([resume.rows.length, hrInterview.rows.length, techInterview.rows.length, jobOffer.rows.length])
      return [resume.rows.length, hrInterview.rows.length, techInterview.rows.length, jobOffer.rows.length];
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server error")
    }
  })

  // get info on all companies where resume is sent
  router.get('/resumes', async (req, res) => {
    const values = ['5c2ea821-8462-4c2b-8bb7-eb1b30739837'];
    const allCompanies = `SELECT companies.title FROM companies
    JOIN applications ON applications.company_id = companies.id
    WHERE companies.user_id = $1 AND
    applications.rejected = FALSE AND
    applications.resume_sent = TRUE;`;
    try {
      const getCompanies = await db.query(allCompanies, values);
      res.json(getCompanies.rows);
      return getCompanies.rows;
    } catch (error) {
      console.error(error.message);
      res.status(404).send('could not load company')
    }
  })
  router.get('/resumes', async (req, res) => {
    const values = ['5c2ea821-8462-4c2b-8bb7-eb1b30739837'];
    const allCompanies = `SELECT companies.title FROM companies
    JOIN applications ON applications.company_id = companies.id
    WHERE companies.user_id = $1 AND
    applications.rejected = FALSE AND
    applications.resume_sent = TRUE;`;
    try {
      const getCompanies = await db.query(allCompanies, values);
      res.json(getCompanies.rows);
      return getCompanies.rows;
    } catch (error) {
      console.error(error.message);
      res.status(404).send('could not load company')
    }
  })
  router.get('/resumes', async (req, res) => {
    const values = ['5c2ea821-8462-4c2b-8bb7-eb1b30739837'];
    const allCompanies = `SELECT companies.title FROM companies
    JOIN applications ON applications.company_id = companies.id
    WHERE companies.user_id = $1 AND
    applications.rejected = FALSE AND
    applications.resume_sent = TRUE;`;
    try {
      const getCompanies = await db.query(allCompanies, values);
      res.json(getCompanies.rows);
      return getCompanies.rows;
    } catch (error) {
      console.error(error.message);
      res.status(404).send('could not load company')
    }
  })
  router.get('/resumes', async (req, res) => {
    const values = ['5c2ea821-8462-4c2b-8bb7-eb1b30739837'];
    const allCompanies = `SELECT companies.title FROM companies
    JOIN applications ON applications.company_id = companies.id
    WHERE companies.user_id = $1 AND
    applications.rejected = FALSE AND
    applications.resume_sent = TRUE;`;
    try {
      const getCompanies = await db.query(allCompanies, values);
      res.json(getCompanies.rows);
      return getCompanies.rows;
    } catch (error) {
      console.error(error.message);
      res.status(404).send('could not load company')
    }
  })
  router.get('/resumes', async (req, res) => {
    const values = ['5c2ea821-8462-4c2b-8bb7-eb1b30739837'];
    const allCompanies = `SELECT companies.title FROM companies
    JOIN applications ON applications.company_id = companies.id
    WHERE companies.user_id = $1 AND
    applications.rejected = FALSE AND
    applications.resume_sent = TRUE;`;
    try {
      const getCompanies = await db.query(allCompanies, values);
      res.json(getCompanies.rows);
      return getCompanies.rows;
    } catch (error) {
      console.error(error.message);
      res.status(404).send('could not load company')
    }
  })

  return router;
}
