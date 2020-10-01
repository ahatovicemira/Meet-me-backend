var express = require('express');
var router = express.Router();
var sequelize = require("../db.js");
var Kupac = require("../models/Kupac.js");
var geodist = require("geodist");

router.get("/svi", function(req, res){
    Kupac.findAll().then(function(kupci){
        res.json(kupci);
    })
});

router.put("/", function(req, res){
    console.log(req.body.naziv);
    if(!req.body.naziv || !req.body.adresa || !req.body.masa || !req.body.volumen || !req.body.longitude || !req.body.latitude){
        res.status(400).json({ error: "Not all parameters all present."});
        return;
    }
    Kupac.create({
        naziv: req.body.naziv,
        masa: req.body.masa,
        adresa: req.body.adresa,
        volumen: req.body.volumen,
        longitude: req.body.longitude,
        latitude: req.body.latitude
    })
    .then(function(kupac){
        res.status(200).json(kupac);
    })
    .catch(function(error) {
        res.status(500).json({ error: "Nesta je krahiralo."});
    })
});

router.delete("/", function(req, res){
    if(!req.body.id){
        res.status(400).json({ error: "Not all parameters all present."});
        return;
    }
    Kupac.destroy({
        where: {
            id: req.body.id
        }
    })
    .then(function(){
        res.status(200).json({ statusCode: "OK" });
    })
    .catch(function(error){
        res.status(500).json({ error: "Nesta je krahiralo."});
    })
});

router.get("/put", function(req, res){

    Kupac.findAll({raw: true}).then(function(kupci){
        console.log(kupci);
        for(var i = 0; i < kupci.length; i++){
            kupci[i].redoslijed = -1;
        }
        var index = Math.floor(Math.random() * kupci.length);
        var kupciUPutu = 1;
        kupci[index].redoslijed = 1;
        while(kupciUPutu != kupci.length){
            var najblziIndex = -1;
            var najbliziPut = 1000000;
            for(var i = 0; i < kupci.length; i++){
                if(kupci[i].redoslijed == -1){
                    var distance = geodist({ lat: kupci[index].latitude, lon: kupci[index].longitude },
                                            {lat: kupci[i].latitude, lon: kupci[i].longitude});
                    if(distance < najbliziPut){
                        najbliziPut = distance;
                        najblziIndex = i;
                    }
                }
            }
            kupci[najblziIndex].redoslijed = kupciUPutu + 1;
            kupciUPutu++;
            index = najblziIndex;
        }
        res.json(kupci);
    })
});
module.exports = router;