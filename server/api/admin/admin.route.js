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
router.get('/fetchAllOrder', adminController.fetchAllOrders);
router.get('/fetchActiveOrder', adminController.fetchActiveOrders);
router.get('/fetchCompletedOrder', adminController.fetchCompletedOrders);
router.post('/updateOrderStatus', adminController.updateOrderStatus);

module.exports = router;
