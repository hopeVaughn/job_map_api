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

  //get all applications
  router.get('/all', async (req, res) => {
    const allApplications = `SELECT * FROM applications;`;
    try {
      const getAllApplications = await db.query(allApplications)
      res.json(getAllApplications.rows);
      return getAllApplications.rows;
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error')
    }
  })

  //get application by id
  router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const singleApplication = `SELECT * FROM applications WHERE applications.id = $1;`;
    try {
      const getSingleApplication = await db.query(singleApplication, [id]);
      res.json(getSingleApplication.rows);
      return getSingleApplication.rows;
    } catch (error) {
      console.error(error.message);
      res.status(404).send('Application not found');
    }
  })

  // get all companies resume's sent
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

  //get all companies hr_interview
  router.get('/hr_interviews', async (req, res) => {
    const values = ['5c2ea821-8462-4c2b-8bb7-eb1b30739837'];
    const allCompanies = `SELECT companies.title FROM companies
    JOIN applications ON applications.company_id = companies.id
    WHERE companies.user_id = $1 AND
    applications.rejected = FALSE AND
    applications.hr_interview = TRUE;`;
    try {
      const getCompanies = await db.query(allCompanies, values);
      res.json(getCompanies.rows);
      return getCompanies.rows;
    } catch (error) {
      console.error(error.message);
      res.status(404).send('Could not load company')
    }
  })

  //get all companies tech_interview
  router.get('/tech_interviews', async (req, res) => {
    const values = ['5c2ea821-8462-4c2b-8bb7-eb1b30739837'];
    const allCompanies = `SELECT companies.title FROM companies
    JOIN applications ON applications.company_id = companies.id
    WHERE companies.user_id = $1 AND
    applications.rejected = FALSE AND
    applications.tech_interview = TRUE;`;
    try {
      const getCompanies = await db.query(allCompanies, values);
      res.json(getCompanies.rows);
      return getCompanies.rows;
    } catch (error) {
      console.error(error.message);
      res.status(404).send('could not load company')
    }
  })

  //get all companies job_offers
  router.get('/job_offers', async (req, res) => {
    const values = ['5c2ea821-8462-4c2b-8bb7-eb1b30739837'];
    const allCompanies = `SELECT companies.title FROM companies
    JOIN applications ON applications.company_id = companies.id
    WHERE companies.user_id = $1 AND
    applications.rejected = FALSE AND
    applications.job_offer = TRUE;`;
    try {
      const getCompanies = await db.query(allCompanies, values);
      res.json(getCompanies.rows);
      return getCompanies.rows;
    } catch (error) {
      console.error(error.message);
      res.status(404).send('could not load company')
    }
  })

  //create new application
  router.post('/', async (req, res) => {
    const values = [req.body.resume_sent, req.body.resume_sent_date, req.body.stack, req.body.company_id];
    const createApplication = `INSERT INTO applications(resume_sent,resume_sent_date,stack,company_id) VALUES($1, $2, $3, $4) RETURNING *;`;
    try {
      const newApplication = await db.query(createApplication, values);
      res.json(newApplication.rows);
      return newApplication.rows;
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error')
    }
  })

  //edit application
  router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const values = [];
    let editApplication = `
    UPDATE applications
    SET `
    if (req.body.rejected) {
      values.push(req.body.rejected);
      editApplication += `rejected = $${values.length},`
    }
    if (req.body.resume_sent) {
      values.push(req.body.resume_sent);
      editApplication += `resume_sent= $${values.length},`
    }
    if (req.body.resume_sent_date) {
      values.push(req.body.resume_sent_date);
      editApplication += `resume_sent_date= $${values.length},`
    }
    if (req.body.hr_interview) {
      values.push(req.body.hr_interview);
      editApplication += `hr_interview = $${values.length},`
    }
    if (req.body.hr_interview_date) {
      values.push(req.body.hr_interview_date);
      editApplication += `hr_interview_date = $${values.length},`
    }
    if (req.body.tech_interview) {
      values.push(req.body.tech_interview);
      editApplication += `tech_interview = $${values.length},`
    }
    if (req.body.tech_interview_date) {
      values.push(req.body.tech_interview_date);
      editApplication += `tech_interview_date = $${values.length},`
    }
    if (req.body.job_offer) {
      values.push(req.body.job_offer);
      editApplication += `job_offer = $${values.length},`
    }
    if (req.body.job_offer_date) {
      values.push(req.body.job_offer_date);
      editApplication += `job_offer_date = $${values.length},`
    }
    if (req.body.stack) {
      values.push(req.body.stack);
      editApplication += `stack = $${values.length},`
    }
    editApplication = editApplication.slice(0, -1);
    editApplication += `WHERE applications.id = ${id};`
    try {
      const updateApplication = await db.query(editApplication, values);
      res.json("Application was updated");
      return updateApplication.rows;
    } catch (error) {
      console.error(error.message);
      res.status(404).send('Could not find Company')
    }
  })
  return router;
}
