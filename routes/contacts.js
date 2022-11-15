const express = require('express');
const dbParams = require('../lib/db');
const router = express.Router();


module.exports = (db) => {

  // get all contacts
  router.get('/', async (req, res) => {
    const contactsQuery = `SELECT * FROM contacts;`
    try {
      const contacts = await db.query(contactsQuery);
      res.json(contacts.rows)
      return contacts.rows;
    } catch (error) {
      console.error(error.message)
      res.status(500).send('Server error')
    }
  })

  // get single contact
  router.get('/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const singleContact = `SELECT * FROM contacts WHERE contacts.id = $1;`
      const getSingleContact = await db.query(singleContact, [id]);
      res.json(getSingleContact.rows);
      return getSingleContact.rows;
    } catch (error) {
      console.error(error.message);
      res.status(404).send("Could not find contact")
    }
  })

  //create contact
  router.post('/', async (req, res) => {
    try {
      const values = [req.body.name, req.body.image, req.body.linkedin, req.body.twitter, req.body.github]
      const createContact = `INSERT INTO contacts(name,network_img,linkedin,twitter,github) VALUES($1, $2, $3, $4, $5) RETURNING *;`
      const newContact = await db.query(createContact, values);
      console.log(values);
      res.json(newContact.rows);
      return newContact.rows;
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error')
    }
  })

  //edit single contact
  router.put('/:id', async (req, res) => {
    //does something
  })

  // delete single contact
  router.delete('/:id', async (req, res) => {
    //does something
  })

  return router;
}
