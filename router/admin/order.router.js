const router = require('express').Router();
const orderController = require("../../controllers/admin/order.controller");

router.get('/view', orderController.dashboardView);


module.exports = router;