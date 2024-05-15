const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

// Ruta de autenticación
router.post("/", authController.authenticate);

module.exports = router;
