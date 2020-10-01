var Sequelize = require("sequelize");

const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "baza.sqlite"
});

module.exports = sequelize;
