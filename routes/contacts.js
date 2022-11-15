const express = require('express');
const dbParams = require('../lib/db');
const router = express.Router();


module.exports = (db) => {

  // get all contacts
  router.get('/', async (req, res) => {
    const contactsQuery = `SELECT * FROM contacts;`
    try {
      const contacts = await db.query(contactsQuery);
      if (contacts.rows.length === 0) {
        return res.status(404).send('No Contacts Availible')
      }
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
      if (getSingleContact.rows.length === 0) {
        return res.status(404).send('Contact Unavailable')
      }
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
      const values = [req.body.name, req.body.image, req.body.linkedin, req.body.twitter, req.body.github];
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
    try {
      const { id } = req.params;
      const values = [];
      let editContact = `
      UPDATE contacts
      SET `
      if (req.body.name) {
        values.push(req.body.name);
        editContact += `name = $${values.length},`
      }
      if (req.body.image) {
        values.push(req.body.image);
        editContact += `network_img = $${values.length},`
      }
      if (req.body.linkedin) {
        values.push(req.body.linkedin);
        editContact += `linkedin = $${values.length},`
      }
      if (req.body.twitter) {
        values.push(req.body.twitter);
        editContact += `twitter = $${values.length},`
      }
      if (req.body.github) {
        values.push(req.body.github);
        editContact += `github = $${values.length},`
      }
      editContact = editContact.slice(0, -1);
      editContact += `WHERE contacts.id = ${id};`
      const updateContact = await db.query(editContact, values);
      res.json("Contact was updated");
      return updateContact.rows
    } catch (error) {
      console.error(error.message);
      res.status(404).send("Could not find contact")
    }
  })

  // delete single contact
  router.delete('/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const removeContact = `DELETE FROM contacts WHERE contacts.id = $1;`;
      const deleteContact = db.query(removeContact, [id]);
      res.json("Contact was deleted");
    } catch (error) {
      console.log(error.message);
      res.status(404).send('Contact not found');
    }
  })

  return router;
}
