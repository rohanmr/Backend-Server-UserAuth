// server/db.js
import mysql from "mysql";

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Whizoid@123",
  database: "user",
});

connection.connect((error) => {
  if (error) throw error;
  console.log("Connected to the MySQL database!");
});

export default connection;
