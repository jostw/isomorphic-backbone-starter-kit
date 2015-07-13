/*
 * isomorphic-backbone-starter-kit
 *
 * https://github.com/jostw/isomorphic-backbone-starter-kit
 *
 * Copyright (c) 2015 jos
 * Licensed under the MIT license.
 */

"use strict";

var fs = require("fs");
var path = require("path");

var _ = require("underscore");
var express = require("express");

var config = require("./js/app/config");
var routes = require("./js/app/routes");
var template = require("./js/app/template");

var App = function App() {
    this.partials = this.getPartials();

    this.start();
};

App.prototype.getPartials = function getPartials() {
    return fs.readdirSync(path.resolve(__dirname, "template/min")).map(function(fileName) {
        if (fileName === config.TEMPLATE_INDEX) {
            return "";
        } else {
            var partial = fs.readFileSync(path.resolve(__dirname, "template/min", fileName), { encoding: "utf8" });

            return "<script id='template-" + fileName.split(".hbs")[0] + "' type='text/template'>" + partial + "</script>";
        }
    }).join("");
};

App.prototype.getTemplate = function getTemplate(templateName) {
    var templatePath = templateName === config.TEMPLATE_INDEX ? "public" : "template/min";

    return fs.readFileSync(path.resolve(__dirname, templatePath, templateName), { encoding: "utf8" });
};

App.prototype.handler = function handler(req, res, options) {
    if (req.xhr) {
        res.send(options.data);
    } else {
        var data = template.render(options.template, options.data, this.getTemplate);

        res.send(template.render(config.TEMPLATE_INDEX, { main: data, partials: this.partials }, this.getTemplate));
    }
};

App.prototype.homeHandler = function homeHandler(req, res) {
    this.handler(req, res, {
        template: routes.home.template,
        data: {
            time: new Date()
        }
    });
};

App.prototype.aboutHandler = function aboutHandler(req, res) {
    this.handler(req, res, {
        template: routes.about.template,
        data: {
            time: new Date()
        }
    });
};

App.prototype.start = function start() {
    var app = express();

    _.each(routes, function(route) {
        app.get(route.url, this[route.handler].bind(this));
    }.bind(this));

    app.use(express.static("public"));

    var server = app.listen(config.SERVER_PORT, function() {
        var host = server.address().address;
        var port = server.address().port;

        console.log("Server listening at http://%s:%s", host, port);
    });
};

module.exports = new App();
