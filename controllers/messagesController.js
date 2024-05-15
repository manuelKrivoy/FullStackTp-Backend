const db = require("../db");

exports.getMessages = (req, res) => {
  const { username } = req.params;
  const query = "select * from messages where username = ? ";
  db.query(query, [username], (err, results) => {
    if (err) {
      return res.status(500).send("Error querying the database");
    }
    res.status(200).json(results);
  });
};

exports.createMessage = (req, res) => {
  const { username } = req.params;
  const { text } = req.body;
  if (!text) {
    return res.status(400).send("Text is required");
  }
  const query = "INSERT INTO messages (username, text) VALUES (?, ?)";
  db.query(query, [username, text], (err, result) => {
    if (err) {
      return res.status(500).send("Error creating message");
    }
    res.status(201).send("Message created successfully");
  });
};

exports.deleteMessage = (req, res) => {
  const { id } = req.params;
  const query = "delete from messages where id = ? ";
  db.query(query, [id], (err, result) => {
    if (err) {
      return res.status(500).send("Error deleting message");
    }
    res.status(201).send("Message deleted successfully");
  });
};

exports.updateMessage = (req, res) => {
  const { id } = req.params;
  const { text } = req.body;
  const query = "update messages set text = ? where id = ? ";
  db.query(query, [text, id], (err, result) => {
    if (err) {
      return res.status(500).send("Error updating message");
    }
    res.status(201).send("Message updated successfully");
  });
};
