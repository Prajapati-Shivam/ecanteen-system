const express = require("express");
const router = express.Router();
const adminController = require("./admin.controller");
const upload = require("../../middleware/multer");
const { requireAdmin } = require("../../middleware/auth");

// Every admin route needs a signed-in admin; req.college_id scopes the data
router.use(requireAdmin);
router.post("/addItem", upload, adminController.addItem);
router.post("/fetchItems", adminController.fetchItems);
router.delete("/deleteItem", adminController.deleteItem);
router.put("/updateItem", adminController.updateItem);
router.post('/fetchAllOrder', adminController.fetchAllOrders);
router.post('/fetchActiveOrder', adminController.fetchActiveOrders);
router.post('/fetchCompletedOrder', adminController.fetchCompletedOrders);
router.post('/updateOrderStatus', adminController.updateOrderStatus);

module.exports = router;
