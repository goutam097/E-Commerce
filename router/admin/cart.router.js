const router = require('express').Router();
const cartController = require("../../controllers/admin/cart.controller");


router.get('/view', cartController.cart);
router.post('/add', cartController.add);
router.get('/delete/:id?', cartController.deleteFromCart);




module.exports = router;