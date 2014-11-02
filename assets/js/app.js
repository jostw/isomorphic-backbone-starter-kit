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

    Backbone = require("backbone");

Backbone.$ = $;

var Marionette = require("backbone.marionette"),

    app = new Marionette.Application();

module.exports = app;
