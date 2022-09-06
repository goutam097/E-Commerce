const router = require('express').Router();
const personDetailsController = require("../../controllers/admin/personDetails.controller");


router.get('/list', personDetailsController.list);
router.post('/list', personDetailsController.update);



module.exports = router;