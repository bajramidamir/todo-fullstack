const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const SERVER_PORT = 3000;
const app = express();
const cors = require("cors");
require('dotenv').config();

// MIDDLEWARE
app.use(bodyParser.json());
app.use(cors());

// DATABASE CONNECTION
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DB,
    port: process.env.DB_PORT,
});
connection.connect((err) => {
  if (err) throw err;
  console.log("Connected to MySQL database");
});



//                          API END POINTS                             //
// ================================================================== //

// displays all the tasks
app.get("/api/todos", (request, response) => {
  const q = "SELECT * FROM damir_todo";
  connection.query(q, (err, results) => {
    if (err) throw err;
    response.json(results);
  });
});

// creating a task
app.post("/api/todos", (req, res) => {
  const { task, category, priority } = req.body;
  const q =
    "INSERT INTO damir_todo(task, status, category, priority) VALUES (?, 0, ?, ?)";
  connection.query(q, [task, category, priority], (err, results) => {
    if (err) throw err;
    res.send("Task added");
  });
});

// updating the status of a task
app.put("/api/todos/:id", (req, res) => {
  const { id } = req.params; // Extract taskId from the route parameters
  const { status } = req.body;

  const q = "UPDATE damir_todo SET status = ? WHERE id = ?";
  try {
    connection.query(q, [status, id], (error, results) => {
      if (error) {
        console.error("Error updating todo:", error);
        res.status(500).send("Internal Server Error");
      } else {
        res.status(200).send("Updated successfully!");
      }
    });
  } catch (error) {
    console.error("Error updating todo:", error);
    res.status(500).send("Internal Server Error");
  }
});

// delete a task
app.delete("/api/todos-delete/:id", (req, res) => {
  const { id } = req.params;

  const q = "DELETE FROM damir_todo WHERE id = ?";
  try {
    connection.query(q, [id], (error, results) => {
      if (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
      } else {
        res.status(200).send("Deleted successfully!");
      }
    });
  } catch (error) {
    console.error("Error deleting todo:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(SERVER_PORT, () => {
  console.log("Server listening on: http://localhost:3000");
});
