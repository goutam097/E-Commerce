const router = require('express').Router();
const brandController = require("../../controllers/admin/brand.controller");

router.get('/view', brandController.dashboardView);


module.exports = router;