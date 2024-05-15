const express = require("express");
const router = express.Router();
const messagesController = require("../controllers/messagesController");

// Rutas para los mensajes
router.get("/:id", messagesController.getMessages);
router.post("/:id", messagesController.createMessage);

module.exports = router;
