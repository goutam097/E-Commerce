const Sequelize = require("sequelize");
const sequelize = require("../configs/database.config");
const AdminModel = require("../models/admin.model");

const Order = sequelize.define("Orders", {
    adminId: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    totalPrice: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    totalDiscount: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    OrderAddress: {
        type: Sequelize.STRING,
        allowNull: true,
    },

});
Order.belongsTo(AdminModel, {
    foreignKey: "adminId",
    onDelete: "cascade"
})


module.exports = Order;
