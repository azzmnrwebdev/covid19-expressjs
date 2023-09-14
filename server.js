/**
 * TODO 1: SETUP SERVER USING EXPRESS.JS.
 * UBAH SERVER DI BAWAH MENGGUNAKAN EXPRESS.JS.
 * SERVER INI DIBUAT MENGGUNAKAN NODE.JS NATIVE.
 */

// import express, favicon, path, body parser dan routes
const express = require("express");
const favicon = require("serve-favicon");
const path = require("path");
const bodyParser = require("body-parser");
const routes = require("./routes/api");

// create express objects
const app = express();

app.use(favicon(path.join(__dirname, "public", "logo.ico")));

// using middleware
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// using routing (routes)
app.use(routes);

// define port => http://localhost:5000
const port = process.env.PORT_APP || 5000;
app.listen(port, () => {
  console.log("[Server] running at http://localhost/5000");
});
