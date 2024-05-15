const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// Rutas para los usuarios
router.get("/", userController.getAllUsers);
router.post("/", userController.createUser);
router.patch("/:username", userController.updateUser);
router.delete("/:username", userController.deleteUser);

module.exports = router;
