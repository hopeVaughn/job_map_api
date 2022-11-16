const express = require('express');
const router = express.Router();

// module.exports = (db) => {
//   router.get('/', (req, res) => {
//     const resumeSentQuery = `SELECT * FROM companies WHERE resume_sent = TRUE;`
//     db.query(resumeSentQuery)
//       .then((result) => {
//         res.json(result.rows.length)
//         return result.rows.length;
//       })
//       .catch((err) => {
//         console.error(err.message)
//       })
//   })
//   return router;
// }

module.exports = (db) => {
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
  });
  return router;
}
