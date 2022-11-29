const express = require('express');
const router = express.Router();

// const values = ['5c2ea821-8462-4c2b-8bb7-eb1b30739837']

module.exports = (db) => {

  //get all network for company
  router.get('/:id', async (req, res) => {

    const { id } = req.params;

    const allNetwork = `SELECT contacts.name, contacts.image, contacts.id, networks.id as networkid FROM contacts
    JOIN networks ON networks.contact_id = contacts.id
    WHERE networks.company_id = $1
    ORDER BY contacts.name ASC`;
    // const getAllContacts = `SELECT contacts.name, contacts.network_img FROM contacts WHERE id = `
    try {
      const getAllNetworks = await db.query(allNetwork, [id])
      res.json(getAllNetworks.rows);
      return getAllNetworks.rows;
    } catch (error) {
      console.error(error.message);
      res.status(404).send('Could not find Network')
    }
  });

  //get all network that is NOT from this company
  router.get('/withoutnetwork/:id', async (req, res) => {
    const { id } = req.params;
    const allNetwork = `SELECT contacts.name, contacts.image, contacts.id FROM contacts
    WHERE id NOT IN (SELECT contact_id FROM networks WHERE networks.company_id = $1)
    ORDER BY contacts.name ASC`;
    // const getAllContacts = `SELECT contacts.name, contacts.network_img FROM contacts WHERE id = `
    try {
      const getAllNetworks = await db.query(allNetwork,  [id])
      res.json(getAllNetworks.rows);
      return getAllNetworks.rows;
    } catch (error) {
      console.error(error.message);
      res.status(404).send('Could not find Network')
    }
  });

  //create new network
  router.post('/', async (req, res) => {
    const values = [req.body.contact_id, req.body.company_id];
    const createNetwork = `INSERT INTO networks(contact_id,company_id) VALUES($1,$2) RETURNING *;`;
    try {
      const newNetwork = await db.query(createNetwork, values);
      res.json(newNetwork.rows);
      return newNetwork.rows;
    } catch (error) {
      console.error(error.message);
      res.status(500).send("server error. Could not create new network")
    }
  })

  //delete network
  router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const removeNetwork = `DELETE FROM networks WHERE networks.id = $1;`;
    try {
      const deleteNetwork = db.query(removeNetwork, [id]);
      res.json("Network was removed");
    } catch (error) {
      console.error(error.message);
      res.status(404).send('Network not found')
    }
  })
  return router;
}
