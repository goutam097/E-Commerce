const Sequelize = require("sequelize");
const sequelize = require("../configs/database.config");

const Brand = sequelize.define("Brands", {
    b_name: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    b_slug: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    b_image: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    b_owner: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    status: {
        type: Sequelize.ENUM("active", "inactive", "archive"),
        allowNull: false,
        defaultValue: "active",
    },
});


module.exports = Brand;
