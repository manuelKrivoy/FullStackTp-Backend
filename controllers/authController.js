const db = require("../db");

exports.authenticate = (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).send("Username and password are required");
  }

  const query = "SELECT * FROM usuarios WHERE username = ? AND password = ?";
  db.query(query, [username, password], (err, results) => {
    if (err) {
      return res.status(500).send("Error querying the database");
    }

    if (results.length > 0) {
      // Usuario autenticado correctamente
      res.status(200).send({ message: "Authenticated", role: username === "admin" ? "admin" : "user" });
    } else {
      // Usuario o contraseña incorrectos
      res.status(401).send("Invalid username or password");
    }
  });
};
