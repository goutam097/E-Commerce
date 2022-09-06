const Sequelize = require("sequelize");
const sequelize = require("../configs/database.config");
const OrderModel = require("../models/order.model");
const productModel = require("../models/product.model");

const OrderItem = sequelize.define("OrderItems", {
    adminId: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    productId: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    price: {
        type: Sequelize.STRING,
        allowNull: true,
    },

});

OrderModel.hasMany(OrderItem, {
    foreignKey: "adminId",
    onDelete: "cascade"
});
productModel.hasMany(OrderItem, {
    foreignKey: "productId",
    onDelete: "cascade"
});


module.exports = OrderItem;
