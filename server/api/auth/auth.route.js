const express = require('express');
const router = express.Router();

const authController = require('./auth.controller');

// Route to check email existence in db
router.post("/check", authController.check);
router.post("/addAdmin", authController.addAdmin);
router.post("/addUser", authController.addUser);

module.exports = router;