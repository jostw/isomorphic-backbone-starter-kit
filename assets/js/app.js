/*
 * ajax-seo-starter-kit
 *
 * https://github.com/jostw/ajax-seo-starter-kit
 *
 * Copyright (c) 2014 jos
 * Licensed under the MIT license.
 */

"use strict";

var $ = require("jquery"),
    _ = require("underscore"),

    Backbone =   require("backbone"),
    Handlebars = require("handlebars");

Backbone.$ = $;

var Marionette = require("backbone.marionette");

$.ajaxSetup({ async: false });

Marionette.Renderer.render = function(templateName, data) {
    var template = Handlebars.partials[templateName];

    if(template) {
        template = Handlebars.compile(template);
    }
    else {
        $.get("templates/" + templateName + ".hbs", function(res) {
            Handlebars.registerPartial(templateName, res);

            template = Handlebars.compile(res);
        });
    }

    return template(data);
};

module.exports = app;
