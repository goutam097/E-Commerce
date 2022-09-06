const router = require('express').Router();
const orderItemController = require("../../controllers/admin/orderItem.controller");

router.get('/view', orderItemController.dashboardView);


module.exports = router;