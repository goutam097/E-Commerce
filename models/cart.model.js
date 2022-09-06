const Sequelize = require("sequelize");
const sequelize = require("../configs/database.config");
const AdminModel = require("../models/admin.model");
const productModel = require("../models/product.model");

const Cart = sequelize.define("Carts", {
    adminId: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    productId: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    quantity: {
        type: Sequelize.STRING,
        allowNull: true,
    },

});
AdminModel.hasMany(Cart, {
    foreignKey: "adminId",
    onDelete: "cascade"
});
productModel.hasMany(Cart, {
    foreignKey: "productId",
    onDelete: "cascade"
});


module.exports = Cart