const express = require("express");
const router = express.Router();
const adminController = require("./admin.controller");
const upload = require("../../middleware/multer");

const { clerkMiddleware } = require('@clerk/express');

router.use(clerkMiddleware());
router.post("/addItem", upload, adminController.addItem);
router.get("/fetchItems", adminController.fetchItems);
router.delete("/deleteItem", adminController.deleteItem);
router.put("/updateItem", adminController.updateItem);
router.get('/fetchOrder', adminController.fetchOrders);

module.exports = router;
