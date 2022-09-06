const router = require('express').Router();
const AdminController = require("../../controllers/admin/admin.controller");


router.get('/log', AdminController.log);
router.post('/login', AdminController.login);
router.get('/reg', AdminController.reg);
router.post('/register', AdminController.register);
router.get('/logout', AdminController.logout);


module.exports = router;