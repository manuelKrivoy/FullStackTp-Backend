// server.js
const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use(cors());

// Configuración de la conexión a la base de datos
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "TpArqWeb",
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    return;
  }
  console.log("Connected to the database");
});

// Ruta de autenticación
app.post("/api/auth", (req, res) => {
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
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
