const db = require("../db");

exports.getAllUsers = (req, res) => {
  const query = "SELECT * FROM usuarios";
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).send("Error querying the database");
    }
    res.status(200).json(results);
  });
};

exports.createUser = (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).send("Username and password are required");
  }

  const query = "INSERT INTO usuarios (username, password) VALUES (?, ?)";
  db.query(query, [username, password], (err, result) => {
    if (err) {
      return res.status(500).send("Error creating user");
    }
    res.status(201).send("User created successfully");
  });
};

exports.updateUser = (req, res) => {
  const { username } = req.params;
  const { password } = req.body;

  if (!username || !password) {
    return res.status(400).send("Username and password are required");
  }

  const query = "UPDATE usuarios SET password = ? WHERE username = ?";
  db.query(query, [password, username], (err, result) => {
    if (err) {
      return res.status(500).send("Error updating user");
    }
    res.status(200).send("User updated successfully");
  });
};

exports.deleteUser = (req, res) => {
  const { username } = req.params;

  if (!username) {
    return res.status(400).send("Username is required");
  }

  const query = "DELETE FROM usuarios WHERE username = ?";
  db.query(query, [username], (err, result) => {
    if (err) {
      return res.status(500).send("Error deleting user");
    }
    res.status(200).send("User deleted successfully");
  });
};
