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

// Ruta para obtener todos los usuarios
app.get("/api/users", (req, res) => {
  const query = "SELECT * FROM usuarios";
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).send("Error querying the database");
    }
    res.status(200).json(results);
  });
});

// Ruta para eliminar un usuario por su user
app.delete("/api/users/:user", (req, res) => {
  const userId = req.params.user;

  if (!userId) {
    return res.status(400).send("User  is required");
  }

  const query = "DELETE FROM usuarios WHERE username = ?";
  db.query(query, [userId], (err, result) => {
    if (err) {
      return res.status(500).send("Error deleting user");
    }
    res.status(200).send("User deleted successfully");
  });
});

// Ruta para agregar un nuevo usuario
app.post("/api/users", (req, res) => {
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
});

// Ruta para editar usuario
app.patch("/api/users/:username", (req, res) => {
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
});

// Middleware para manejar rutas no definidas
app.use((req, res, next) => {
  res.status(404).send("Not Found");
});

// Middleware para manejar errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Server Error");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
