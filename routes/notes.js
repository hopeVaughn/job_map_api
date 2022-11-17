const express = require('express');
const router = express.Router();


module.exports = (db) => {

  //get all notes
  router.get('/', async (req, res) => {
    //do something
    const values = ['5c2ea821-8462-4c2b-8bb7-eb1b30739837'];
    const allNotes = `SELECT * FROM notes
    JOIN `
    try {

    } catch (error) {

    }
  })

  // create new note
  router.post('/', async (req, res) => {
    //do something
    try {

    } catch (error) {

    }
  })

  // edit single note
  router.put('/', async (req, res) => {
    //do something
    try {

    } catch (error) {

    }
  })

  // delete single note
  router.delete('/', async (req, res) => {
    //do something
    try {

    } catch (error) {

    }
  })


  return router;
}
