const express = require('express');
const router = express.Router();


module.exports = (db) => {
  router.get('/', async (req, res) => {
    const getCompanies = `SELECT * FROM companies;`
    try {
      const companies = await db.query(getCompanies);
      res.json(companies.rows)
      return companies.rows
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server error")
    }
  })
  return router;
}
