const express = require('express');
const router = express.Router();


module.exports = (db) => {

  // get all companies
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

  // get single company
  router.get('/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const singleCompany = `SELECT * FROM companies WHERE companies.id = $1;`;
      const getSingleCompany = await db.query(singleCompany, [id]);
      if (getSingleCompany.rows.length === 0) {
        return res.status(404).send('Company Unavailable')
      }
      res.json(getSingleCompany.rows);
      return getSingleCompany.rows
    } catch (error) {
      console.error(error.message);
      res.status(404).send('Could not find Company')
    }

  })

  //create company
  router.post('/', async (req, res) => {
    //does something
  })

  //edit company
  router.put('/:id', async (req, res) => {
    //does something
  })

  //delete company
  router.delete('/:id', async (req, res) => {
    //does something
  })
  return router;
}
