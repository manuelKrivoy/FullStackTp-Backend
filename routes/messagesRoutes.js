const express = require("express");
const router = express.Router();
const messagesController = require("../controllers/messagesController");

// Rutas para los mensajes
router.get("/:username", messagesController.getMessages);
router.post("/:username", messagesController.createMessage);
router.delete("/:id", messagesController.deleteMessage);
router.patch("/:id", messagesController.updateMessage);

module.exports = router;
