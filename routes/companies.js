const express = require('express');
const router = express.Router();


module.exports = (db) => {

  // get all companies
  router.get('/', async (req, res) => {
    const getCompanies = `SELECT * FROM companies ORDER BY companies.name ASC;`
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
    const { id } = req.params;
    const singleCompany = `SELECT * FROM companies WHERE companies.id = $1;`;
    try {
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
    const user_id = '5c2ea821-8462-4c2b-8bb7-eb1b30739837';
    const values = [req.body.name, user_id];
    const createCompany = `INSERT INTO companies(name,user_id) VALUES($1, $2) RETURNING *;`;
    try {
      const newCompany = await db.query(createCompany, values);
      res.json(newCompany.rows);
      return newCompany.rows;
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error')
    }
  })

  //edit company
  router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const values = [];
    let editCompany = `
    UPDATE companies
    SET `
    if (req.body.name) {
      values.push(req.body.name);
      editCompany += `name = $${values.length},`
    }
    editCompany = editCompany.slice(0, -1);
    editCompany += `WHERE companies.id = ${id};`
    try {
      const updateCompany = await db.query(editCompany, values);
      res.json("Company was updated");
      return updateCompany.rows;
    } catch (error) {
      console.error(error.message);
      res.status(404).send('Could not find Company')
    }
  })

  //delete company
  router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const removeCompany = ` DELETE FROM companies WHERE companies.id = $1;`;
    try {
      const deleteCompany = db.query(removeCompany, [id]);
      res.json("Company was deleted");
    } catch (error) {
      console.error(error.message);
      res.status(404).send('Company not found')
    }
  })


  return router;
}
