import db from "../db.js";

const getUser = (req, res) => {
  // Retrieve user information from the database
  db.query(
    "SELECT * FROM user_register WHERE id=?",
    [Number(req.body.userId)],
    (error, results) => {
      console.log(results);
      if (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal Server Error" });
      }

      if (results.length === 0) {
        return res.status(404).json({ error: "User not found" });
      }

      // Return the user information
      const user = results[0];
      return res.status(200).json({ user });
    }
  );
};

export { getUser };
