const express = require("express");
const router = express.Router();
const { clerkMiddleware } = require("@clerk/express");

const authController = require("./auth.controller");

// Route to check email existence in db
router.post("/check", authController.check);
router.post("/addAdmin", authController.addAdmin);
router.post("/addUser", authController.addUser);
router.post("/addOrder", authController.addOrder);
router.post("/displayOrder", authController.displayOrder);
router.post("/browseOrder", authController.browseOrder);
router.post("/payment", authController.payment);

router.post("/deleteAccount", authController.deleteAccount);

module.exports = router;
