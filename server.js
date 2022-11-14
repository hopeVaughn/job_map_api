// load .env data into process.env // load the .env!
require("dotenv").config();
// Web server config
const PORT = process.env.PORT || 8080;
const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require('body-parser');
// PG database client/connection setup
const { Pool } = require("pg");
const dbParams = require("./lib/db.js");
const db = new Pool(dbParams);
db.connect();

//middleware
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));



// Separated Routes for each use

const home = require("./routes/home")
const companies = require("./routes/companies")



// Mount all Resource routes

app.use('/', home(db));
app.use('/companies', companies(db));





app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
