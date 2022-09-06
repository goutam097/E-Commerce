const Sequelize = require("sequelize");
const sequelize = require("../configs/database.config");

const Admin = sequelize.define("Admins", {
    name: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    email: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    mobile: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    gender: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    password: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    status: {
        type: Sequelize.ENUM("active", "inactive", "archive"),
        allowNull: false,
        defaultValue: "active",
    },
    role: {
        type: Sequelize.ENUM("admin", "user"),
        allowNull: false,
        defaultValue: "user",
    },
});


module.exports = Admin;
