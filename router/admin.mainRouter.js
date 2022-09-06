const router = require("express").Router();
const adminRoute = require("./admin/admin.router");
const orderRoute = require("../router/admin/order.router");
const brandRoute = require("../router/admin/brand.router");
const cartRoute = require("../router/admin/cart.router");
const orderItemRoute = require("../router/admin/orderItem.router");
const productRoute = require("../router/admin/product.router");
const productCatogoryRoute = require("../router/admin/productCatogory.router");
// const cartModel = require("../models/cart.model");
const authMiddleware = require("../middlewares/auth.middleware")
const dashboardRouter = require("./admin/dashboard.router")
const personDetailsRouter = require("./admin/personDetails.router")

// router.get("/", (req, res) => {
//     res.redirect("/dashboard/view");
// })

router.get("/", (req, res) => {
    res.redirect("/product/view");
})

async function userDetails(req, res, next) {
    try {
        const details = req.user;
        res.locals.userId = details.userId || ""
        res.locals.name = details.name || ""
        res.locals.email = details.email || ""
        next();
    } catch (error) {
        res.redirect("/admin/log")
    }
}

router.use("/admin", adminRoute);
router.use("/dashboard", authMiddleware, userDetails, dashboardRouter);
router.use("/order", authMiddleware, userDetails, orderRoute);
router.use("/brand", authMiddleware, userDetails, brandRoute);
router.use("/cart", authMiddleware, userDetails, cartRoute);
router.use("/orderItem", authMiddleware, userDetails, orderItemRoute);
router.use("/product", authMiddleware, userDetails, productRoute);
router.use("/productCategory", authMiddleware, userDetails, productCatogoryRoute);
router.use("/details", personDetailsRouter);

module.exports = router;