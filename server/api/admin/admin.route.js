const express = require("express");
const router = express.Router();

const adminController = require("./admin.controller");

// Route to check email existence in db
router.post("/check", adminController.check);
router.post("/addAdmin", adminController.addAdmin);
router.post("/addUser", adminController.addUser);
router.post("/addItem", adminController.addItem);
router.get("/fetchItems", adminController.fetchItems);
router.delete("/deleteItem", adminController.deleteItem);
router.put("/updateItem", adminController.updateItem);

module.exports = router;
