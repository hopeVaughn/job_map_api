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

  return router;
}
