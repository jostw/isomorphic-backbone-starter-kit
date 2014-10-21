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

    app = express();

app.get("/", function(req, res) {
    res.send("Hello World");
});

var server = app.listen(3000, function() {
    var host = server.address().address,
        port = server.address().port;

    console.log("Example app listening at http://%s:%s", host, port);
});
