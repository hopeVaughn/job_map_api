const express = require('express');
const router = express.Router();


module.exports = (db) => {
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
  router.post('/', async (req, res) => {
    //does something
  })
  router.put('/:id', async (req, res) => {
    //does something
  })
  router.delete('/:id', async (req, res) => {
    //does something
  })

  return router;
}
