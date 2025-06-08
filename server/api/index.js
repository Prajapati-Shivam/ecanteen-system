const express = require('express');
const router = express.Router();
const adminRouter = require('./admin/admin.route');
const authRouter = require('./auth/auth.route');

router.use('/admin', adminRouter);
router.use('/auth', authRouter);

module.exports = router;

