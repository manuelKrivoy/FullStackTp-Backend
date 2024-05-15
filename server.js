const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use(cors());

// Importar rutas
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const messagesRoutes = require("./routes/messagesRoutes.js");

// Usar las rutas
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/messages", messagesRoutes);

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
