const productModel = require("../../models/product.model");
const cartModel = require("../../models/cart.model");

exports.list = async (req, res) => {
    try {
        const userId = req.user.id || null;
        const productList = await productModel.findAll();
        const filterProduct = [];
        for (let pl of productList) {
            const count = await cartModel.count({where: {adminId: userId, productId: pl.id}})
            filterProduct.push({
                id: pl.id,
                P_name: pl.P_name,
                P_price: pl.P_price,
                P_discount: pl.P_discount,
                in_cart: count ? true : false,
                P_image: pl.P_image ? `${req.app.locals.baseurl}images/${pl.P_image}` : "",
            })
        }
        return res.render("product", {
            productList: filterProduct
        })
    } catch (error) {
        return res.redirect("/admin/log");
    }
}


exports.add = async (req, res) => {
    const productId = req.params.id;
    console.log(productId);
    const cart = new productModel(req.session.cart ? req.session.cart : {});

    productModel.findById(productId, function (err, product) {
        if (err) {
            return res.redirect('/');
        }
        cart.add(product, product.id);
        req.session.cart = cart;
        console.log(req.session.cart);
        res.redirect('/cart/view');
    })
}

exports.inc = async (req, res) => {
    const productId = req.params.id;
    const updateQuantity = req.body;
    const filter = { _id: ObjectId(id) };
    const options = { upsert: true };
    const updateDoc = {$inc : {'productQuantity' : 1}};
    const result = await productModel.findOneAndUpdate(filter, updateDoc, options).exec()
    res.send(result);
}


