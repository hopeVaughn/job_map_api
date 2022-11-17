const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const validInfo = require("../middleware/validInfo");
const jwtGenerator = require("../utils/jwtGenerator");
const authorize = require("../middleware/authorize");

module.exports = (db) => {
  router.post("/register", validInfo, async (req, res) => {
    //1. destructure the req.body
    const { email, name, password } = req.body;
    //2. check if user exists (if user exists throw error)
    try {
      const user = await db.query("SELECT * FROM users WHERE user_email = $1", [
        email
      ]);

      if (user.rows.length > 0) {
        return res.status(401).json("User already exist!");
      }

      //3. Bcrypt the user password
      const salt = await bcrypt.genSalt(10);
      const bcryptPassword = await bcrypt.hash(password, salt);

      //4. enter new user inside our database
      let newUser = await db.query(
        "INSERT INTO users (user_name, user_email, user_password) VALUES ($1, $2, $3) RETURNING *",
        [name, email, bcryptPassword]
      );

      //5. generate our jwt token
      const jwtToken = jwtGenerator(newUser.rows[0].user_id);

      return res.json({ jwtToken });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  });

  router.post("/login", validInfo, async (req, res) => {
    //1. destructure the req.body
    const { email, password } = req.body;

    //2. check if user does not exists (if not throw error)
    try {
      const user = await db.query("SELECT * FROM users WHERE user_email = $1", [
        email
      ]);

      if (user.rows.length === 0) {
        return res.status(401).json("Invalid Credential");
      }

      //3. check if incoming password is the same as the db password
      const validPassword = await bcrypt.compare(
        password,
        user.rows[0].user_password
      );

      if (!validPassword) {
        return res.status(401).json("Invalid Credential");
      }

      //4. generate jwt token. This token gives user access to private routes in application
      const jwtToken = jwtGenerator(user.rows[0].user_id);
      return res.json({ jwtToken });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  });

  router.post("/verify", authorize, (req, res) => {
    try {
      res.json(true);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  });

  return router
}
