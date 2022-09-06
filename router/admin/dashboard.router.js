const router = require('express').Router();
const dashboardController = require("../../controllers/admin/dashboard.controller");


router.get('/view', dashboardController.dashboardView);


module.exports = router;