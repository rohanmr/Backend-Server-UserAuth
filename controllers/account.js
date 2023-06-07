import db from "../db.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const register = (req, res) => {
  const { first_name, last_name, email, password } = req.body;

  // Hash the password
  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    db.query(
      "SELECT * FROM user_register WHERE email=?",
      [email],
      (error, results) => {
        if (error) {
          console.log(error);
          return res.status(500).json({ error: "Internal Server Error" });
        }

        if (results.length !== 0) {
          return res.status(400).json({ error: "Email already exists" });
        }
      }
    );

    // Store the user in the database
    db.query(
      "INSERT INTO user_register (first_name, last_name, email, password) VALUES (?, ?, ?, ?)",
      [first_name, last_name, email, hashedPassword],
      (error, results) => {
        if (error) {
          console.log(error);
          return res.status(500).json({ error: "Internal Server Error" });
        }

        // Generate a JWT token for authentication
        const token = jwt.sign({ email }, "your_secret_key");

        return res.status(200).json({ token });
      }
    );
  });
};

const login = (req, res) => {
  const { email, password } = req.body;
  console.log(req);

  // Retrieve the user from the database
  db.query(
    "SELECT * FROM user_register WHERE email = ?",
    [email],
    (error, results) => {
      if (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal Server Error" });
      }

      if (results.length === 0) {
        return res.status(401).json({ error: "Invalid email or password" });
      }

      // Compare the password
      bcrypt.compare(password, results[0].password, (err, result) => {
        if (err) {
          console.log(err);
          return res.status(500).json({ error: "Internal Server Error" });
        }

        if (!result) {
          return res.status(401).json({ error: "Invalid email or password" });
        }

        // Generate a JWT token for authentication
        const token = jwt.sign({ email }, "your_secret_key");

        return res.status(200).json({ token });
      });
    }
  );
};

export { register, login };
