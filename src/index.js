const express = require('express');
var createError = require("http-errors");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var favicon = require("serve-favicon");
require("dotenv").config();

const chilexpress = require('./rutas/chilexpress');
var webpayPlusRouter = require("./rutas/webpay_plus");


const app = express();  //crear la aplicacion

// para cargar los middleware actua entre las aplicaciones y los sistemas operativos o recursos de red
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use(logger("dev"));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));  //Creacion de la carpeta publica


//cargar las routes van de la mano con middlware
app.use('/chilexpress', chilexpress);
app.use("/webpay_plus", webpayPlusRouter);

//server que levantaria la aplicacion
app.listen(process.env.SERVER_PORT, () => {
  //console.log(`Server is running on port ${process.env.SERVER_PORT}`);
  console.log('Servidor corriendo en el puerto: ' + process.env.SERVER_PORT);

})