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
    const values = [req.body.title, req.body.category, req.body.human_resources, req.body.human_resources_img, req.body.recruiter, req.body.recruiter_img];
    const createCompany = `INSERT INTO companies(title,category,human_resources,human_resources_img,recruiter,recruiter_img) VALUES($1, $2, $3, $4, $5, $6) RETURNING *;`;
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
    if (req.body.title) {
      values.push(req.body.title);
      editCompany += `title = $${values.length},`
    }
    if (req.body.category) {
      values.push(req.body.category);
      editCompany += `category= $${values.length},`
    }
    if (req.body.human_resources) {
      values.push(req.body.human_resources);
      editCompany += `human_resources = $${values.length},`
    }
    if (req.body.human_resources_img) {
      values.push(req.body.human_resources_img);
      editCompany += `human_resources_img = $${values.length},`
    }
    if (req.body.recruiter) {
      values.push(req.body.recruiter);
      editCompany += `recruiter = $${values.length},`
    }
    if (req.body.recruiter_img) {
      values.push(req.body.recruiter_img);
      editCompany += `recruiter_img = $${values.length},`
    }
    editCompany = editCompany.slice(0, -1);
    editCompany += `WHERE contacts.id = ${id};`
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
    //does something
  })
  return router;
}
