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
    const allApplications = `SELECT applications.*, name FROM applications
    JOIN companies ON applications.company_id = companies.id;`;
    try {
      const getAllApplications = await db.query(allApplications)
      res.json(getAllApplications.rows);
      return getAllApplications.rows;
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error')
    }
  })


  // get all sent resume's
  router.get('/resumes', async (req, res) => {
    const values = ['5c2ea821-8462-4c2b-8bb7-eb1b30739837'];
    const allResumes = `SELECT applications.id,applications.stack, applications.resume_sent_date,applications.company_id, companies.name FROM companies
    JOIN applications ON applications.company_id = companies.id
    WHERE companies.user_id = $1 AND
    applications.rejected = FALSE AND
    applications.resume_sent = TRUE;`;
    try {
      const getAllResumes = await db.query(allResumes, values);
      res.json(getAllResumes.rows);
      return getAllResumes.rows;
    } catch (error) {
      console.error(error.message);
      res.status(404).send('could not load company')
    }
  })

  //get all hr_interview's
  router.get('/hr_interviews', async (req, res) => {
    const values = ['5c2ea821-8462-4c2b-8bb7-eb1b30739837'];
    const allCompanies = `SELECT applications.id,applications.stack, applications.resume_sent_date,applications.company_id, companies.name FROM companies
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

  //get all tech_interview's
  router.get('/tech_interviews', async (req, res) => {
    const values = ['5c2ea821-8462-4c2b-8bb7-eb1b30739837'];
    const allCompanies = `SELECT applications.id,applications.stack, applications.resume_sent_date,applications.company_id, companies.name FROM companies
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

  //get all job_offers
  router.get('/job_offers', async (req, res) => {
    const values = ['5c2ea821-8462-4c2b-8bb7-eb1b30739837'];
    const allCompanies = `SELECT applications.id,applications.stack, applications.resume_sent_date,applications.company_id, companies.name FROM companies
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
    const values = [
      req.body.resume_sent,
      req.body.resume_sent_date,
      req.body.stack,
      req.body.front_end,
      req.body.back_end,
      req.body.full_stack,
      req.body.company_id
    ];
    const createApplication = `INSERT INTO applications(
      resume_sent,
      resume_sent_date,
      stack,
      front_end,
      back_end,
      full_stack,
      company_id) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *;`;
    try {
      const newApplication = await db.query(createApplication, values);
      res.json(newApplication.rows);
      return newApplication.rows;
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error')
    }
  })

  // //get application by id
  router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const singleApplication = `SELECT * FROM applications WHERE applications.id = $1;`;
    try {
      const getSingleApplication = await db.query(singleApplication, [id]);
      res.json(getSingleApplication.rows);
      return getSingleApplication.rows;
    } catch (error) {
      console.error(error.message);
      res.status(404).send('Single application not found');
    }
  })
  // //get custom application by id
  router.get('/custom/:id', async (req, res) => {
    const { id } = req.params;
    const singleApplication = `SELECT applications.stack,applications.front_end, applications.back_end, applications.full_stack,companies.name, companies.id FROM companies
    JOIN applications ON applications.company_id = companies.id
    WHERE applications.id = $1`;
    try {
      const getSingleApplication = await db.query(singleApplication, [id]);
      res.json(getSingleApplication.rows);
      return getSingleApplication.rows;
    } catch (error) {
      console.error(error.message);
      res.status(404).send('Single application not found');
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
    if (typeof req.body.resume_sent !== 'undefined') {
      values.push(req.body.resume_sent);
      editApplication += `resume_sent= $${values.length},`
    }
    if (req.body.resume_sent_date) {
      values.push(req.body.resume_sent_date);
      editApplication += `resume_sent_date= $${values.length},`
    }
    if (typeof req.body.hr_interview !== 'undefined') {
      values.push(req.body.hr_interview);
      editApplication += `hr_interview = $${values.length},`
    }
    if (typeof req.body.tech_interview !== 'undefined') {
      values.push(req.body.tech_interview);
      editApplication += `tech_interview = $${values.length},`
    }
    if (typeof req.body.job_offer !== 'undefined') {
      values.push(req.body.job_offer);
      editApplication += `job_offer = $${values.length},`
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

  //delete application
  router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const removeApplication = `DELETE FROM applications WHERE applications.id = $1;`;
    try {
      const deleteApplication = db.query(removeApplication, [id]);
      res.json("Application was deleted");
    } catch (error) {
      console.error(error.message);
      res.status(404).send('Company not found')
    }
  })

  // --------------------------- NOTES -------------------------------------

  // !!! This route handler uses hardcoded application id. Also, I don't think that we need /all here
  // I implemented the functionality we required in the route handler that goes next.

  //get all notes
  // router.get('/notes/all', async (req, res) => {
  //   //do something
  //   // const id = 1;
  //   const allNotes = `SELECT * FROM notes WHERE notes.application_id = 1 ORDER BY notes.application_id DESC;
  //   `
  //   try {
  //     const getAllNotes = await db.query(allNotes)
  //     console.log(getAllNotes.rows);
  //     res.json(getAllNotes.rows)
  //   } catch (error) {
  //     console.error(error.message);
  //     res.status(404).send('could not find notes')
  //   }
  // })

  //----------------Nadia--------------------------------------
  // Fetch notes for a specific application by id
  router.get('/:id/notes', async (req, res) => {
    //do something
    // const id = 1;
    const values = [req.params.id];
    const allNotes = `
    SELECT * FROM notes WHERE notes.application_id = $1
    ORDER BY timestamp DESC;
    `
    try {
      const getAllNotes = await db.query(allNotes, values)
      console.log(getAllNotes.rows);
      res.json(getAllNotes.rows)
    } catch (error) {
      console.error(error.message);
      res.status(404).send('could not find notes')
    }
  })
  //----------------Nadia--------------------------------------


  // create new note
  router.post('/:id/notes', async (req, res) => {
    const { id } = req.params;
    //const timestamp = Date.now();
    //const values = [id, req.body.note, timestamp];
    const values = [id, req.body.note];
    //const createNote = `INSERT INTO notes(application_id,note, timestamp) VALUES($1,$2,$3) RETURNING*;`
    const createNote = `INSERT INTO notes(application_id,note) VALUES($1,$2) RETURNING*;`
    try {
      const newNote = await db.query(createNote, values);
      res.json(newNote.rows);
      return newNote;
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error')
    }
  })

  // edit single note
  router.put('/notes/:id', async (req, res) => {
    const { id } = req.params;

    const values = [req.body.note, id];
    let editNote = `
    UPDATE notes
    SET note = $1
    WHERE id = $2;
    `
    try {
      const updateNote = await db.query(editNote, values)
      res.json(updateNote.rows)
      return updateNote.rows
    } catch (error) {
      console.error(error.message)
      res.status(404).send('could not find note')
    }
  })

  // delete single note
  router.delete('/notes/:id', async (req, res) => {
    const { id } = req.params;
    const values = [id];
    const removeNote = `DELETE FROM notes WHERE id = $1;`
    try {
      const updateNote = await db.query(removeNote, values)
      res.json(updateNote.rows)
      return updateNote.rows
    } catch (error) {
      console.error(error.message)
      res.status(404).send('could not find note')
    }
  })
  return router;
}



