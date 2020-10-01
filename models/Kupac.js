var Sequelize = require("sequelize");
var sequelize = require("../db.js");


var Kupac = sequelize.define("Kupac", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
    },
    naziv: {
        type: Sequelize.STRING,
        allowNull: false
    },
    adresa:{
        type: Sequelize.STRING,
        allowNull: false
    },
    masa: {
        type: Sequelize.DECIMAL,
        allowNull: false
    },
    volumen: {
        type: Sequelize.DECIMAL,
        allowNull: false
    },
    longitude: {
        type: Sequelize.DOUBLE,
        allowNull: false
    },
    latitude: {
        type: Sequelize.DOUBLE,
        allowNull: false
    }
});

Kupac.sync({ force: true }).then(function(){
    Kupac.create({
        naziv: "Emira Ahatovic",
        masa: 24.2,
        adresa: "Moscanica",
        volumen: 2200,
        longitude: 23.22232,
        latitude: 62.23223
    }).then(function(){ console.log("Kreiran kupac Emira")})
    Kupac.create({
        naziv: "Muhamed Dellaic",
        masa: 15.23,
        adresa: "Bratunacka",
        volumen: 1200,
        longitude: 42.22232,
        latitude: 11.23223
    }).then(function(){ console.log("Kreiran kupac Muhamed")});
    Kupac.create({
        naziv: "Aleksandar Acimovic",
        masa: 54.424,
        adresa: "Grbavica",
        volumen: 5200,
        longitude: 63.26632,
        latitude: 61.22223
    }).then(function(){console.log("Kreiran kupac Aca")});
});

module.exports = Kupac;