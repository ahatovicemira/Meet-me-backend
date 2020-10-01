var express = require("express");
var logger = require('morgan');
var cors = require('cors');

var app = express();

// Incluing routes
var kupac = require("./routes/kupac");

// Helper modules
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
// Routes and routers

app.use("/kupac", kupac);


// starting the Server
app.listen(process.env.PORT || 80, function(){
    console.log("Server je pokrenut,")
});



