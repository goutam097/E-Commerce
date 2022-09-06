const router = require('express').Router();
const productCatogoryController = require("../../controllers/admin/productCatogory.controller");

router.get('/view', productCatogoryController.dashboardView);


module.exports = router;