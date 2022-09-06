const cartModel = require("../../models/cart.model");
const ProductModel = require("../../models/product.model");

exports.cart = async (req, res) => {
    try {
        const userId = req.user.id || null;
        const cartList = await cartModel.findAll({where:{adminId: userId}})
       
        const modifyCartList = []
        for(let cl of cartList){
            const productDetails = await ProductModel.findOne({attributes: ['P_name','P_price','P_image'], where:{id: cl.productId}})
            cl.dataValues.P_name = productDetails && productDetails.P_name ? productDetails.P_name : ""
            cl.dataValues.P_price = productDetails && productDetails.P_price ? productDetails.P_price : ""
            cl.dataValues.P_image = productDetails && productDetails.P_image ? `${req.app.locals.baseurl}images/${productDetails.P_image}` : ""
            modifyCartList.push(cl.dataValues)
        }
        console.log(modifyCartList)

        return res.render('addToCart', {
            data: modifyCartList,
            title: "Product List"
        })
    } catch (error) {
        console.log(error);
    }
}

exports.add = async (req, res) => {
    try{
        const userId = req.user.id || null;
        const productId = req.body.id || null;
        const details = await cartModel.create({adminId: userId, productId: productId, quantity: 1});
        return res.send(details);
    }catch(err){
        return res.send({error: err})
    }
}

exports.deleteFromCart = async (req, res) => {
    const id = req.params.id;
    await cartModel.destroy({
        where: { 
                    Id: id 
        }
    }).then((value) => {
        if (value) {
            res.redirect('back');
        } else {
            res.redirect('back');
        }
    });
    }

// exports.list = async (req, res) => {
//     try {
//         const userId = req.user.id || null;
//         const cartLists = await cartModel.findAll();
//         let filterCart = [];
//         for (let cl of cartLists) {
//             const count = await cartModel.count({where: {adminId: userId, productId: cl.id}})
//             filterCart.push({
//                 id: cl.id,
//                 P_name: cl.P_name,
//                 P_price: cl.P_price,
//                 P_discount: cl.P_discount,
//                 in_cart: count ? true : false,
//                 P_image: cl.P_image ? `${req.app.locals.baseurl}images/${cl.P_image}` : "",
//             })
//         }
//         res.render("product", {
//             cartListsData: filterCart
//         })
//     } catch (error) {
//         console.log("err")
        
//     }
// }
// return res.redirect("/admin/log");

// exports.list = async (req, res) => {
//     const id = req.body.id;
//     try {
//         // const cartList = await cartModel.findAll()
//         const cartList = await cartModel.findAll({attributes:['productId'],where:{productId: id}});


//         if (cartList) {
//             return res.render('addToCart', {
//                 data: cartList,
//                 title: "Student List"
//             })
//         }
//     } catch (error) {
//         console.log(error);
//     }
// };






