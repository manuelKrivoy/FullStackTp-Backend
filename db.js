const mysql = require("mysql2");

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

module.exports = db;
