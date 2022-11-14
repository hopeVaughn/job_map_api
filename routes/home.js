const express = require('express');
const router = express.Router();

module.exports = (db) => {
  router.get('/', (req, res) => {
    const resumeSentQuery = `SELECT * FROM companies WHERE resume_sent = TRUE;`
    db.query(resumeSentQuery)
      .then((result) => {
        res.json(result.rows.length)
        return result.rows.length;
      })
      .catch((err) => {
        console.error(err.message)
      })
  })
  return router;
}
