const express = require("express");
const router = express.Router();

const adminController = require("./admin.controller");

router.post("/addItem", adminController.addItem);
router.get("/fetchItems", adminController.fetchItems);
router.delete("/deleteItem", adminController.deleteItem);
router.put("/updateItem", adminController.updateItem);

module.exports = router;
