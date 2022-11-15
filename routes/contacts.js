const express = require('express');
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
  router.get('/:id', (req, res) => {
    //does something
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
