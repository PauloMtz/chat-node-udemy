// imports
var express = require("express");
var consign = require("consign");
var bodyParser = require("body-parser");
var expressValidator = require("express-validator");

/*
    - Instalações
        npm install --save express@4.15.3
        (...)

    Ver demais bibliotecas no arquivo package.json
*/

// inicia o express
var app = express();

// configurações
app.set("view engine", "ejs");
app.set("views", "./app/views");

// middlewares
app.use(express.static("./app/public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());

// consign faz autoload das rotas, models e controllers
consign().include("app/routes").then("app/controllers").into(app);

// exporta o módulo
module.exports = app;
