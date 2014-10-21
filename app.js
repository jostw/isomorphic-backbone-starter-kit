/*
 * ajax-seo-starter-kit
 *
 * https://github.com/jostw/ajax-seo-starter-kit
 *
 * Copyright (c) 2014 jos
 * Licensed under the MIT license.
 */

"use strict";

var express = require("express"),
    exphbs =  require("express-handlebars"),

    app = express();

app.engine("hbs", exphbs({ defaultLayout: "index", extname: ".hbs" }));
app.set("view engine", "hbs");
app.set("views", "views/templates");

app.get("/", function(req, res) {
    res.render("home");
});

var server = app.listen(3000, function() {
    var host = server.address().address,
        port = server.address().port;

    console.log("Example app listening at http://%s:%s", host, port);
});
