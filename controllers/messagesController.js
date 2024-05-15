const db = require("../db");

exports.getMessages = (req, res) => {
  const { username } = req.params;
  const query = "SELECT * FROM messages where username= ?";
  db.query(query, [username], (err, results) => {
    if (err) {
      return res.status(500).send("Error querying the database");
    }
    res.status(200).json(results);
  });
};

exports.createMessage = (req, res) => {
  const { text } = req.body;
  const { username } = req.params;

  const query = "INSERT INTO messages (username, text) VALUES (?, ?)";
  db.query(query, [username, text], (err, result) => {
    if (err) {
      return res.status(500).send("Error creating message");
    }
    res.status(201).send("Message created successfully");
  });
};
