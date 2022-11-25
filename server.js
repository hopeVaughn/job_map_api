// load .env data into process.env // load the .env!
require("dotenv").config();
// Web server config
const PORT = process.env.PORT || 8080;
const express = require("express");
const app = express();
const cors = require("cors")
app.use(cors());
const morgan = require("morgan");
// PG database client/connection setup
const { Pool } = require("pg");
const dbParams = require("./lib/db.js");
const db = new Pool(dbParams);
db.connect();

//middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));



// Separated Routes for each use

const companies = require("./routes/companies")
const contacts = require("./routes/contacts")
const applications = require("./routes/applications")
const authenticate = require("./routes/jwtAuth")
const networks = require('./routes/networks')
const notes = require('./routes/notes')
// Mount all Resource routes

app.use('/api/companies', companies(db));
app.use('/api/contacts', contacts(db));
app.use('/api/applications', applications(db));
app.use('/api/networks', networks(db))
app.use('/api/notes', notes(db))
app.use('/api/authentication', authenticate(db))






app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
