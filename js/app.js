/*
 * isomorphic-backbone-starter-kit
 *
 * https://github.com/jostw/isomorphic-backbone-starter-kit
 *
 * Copyright (c) 2015 jos
 * Licensed under the MIT license.
 */

"use strict";

require("./vendor/plugins");

var $ = require("jquery");
var Backbone = require("backbone");
var Marionette = require("backbone.marionette");

var template = require("./app/template");

var AppRouter = require("./router/AppRouter");
var LinkLayoutView = require("./layoutView/LinkLayoutView");
var MainItemView = require("./itemView/MainItemView");

var app;

Marionette.Renderer.render = function render(templateName, templateData) {
    return template.render(templateName, templateData, function(name) {
        return $("#template-" + name.split(".hbs")[0]).html();
    });
};

app = new Marionette.Application();

app.appRouter = new AppRouter();
app.linkLayoutView = new LinkLayoutView();
app.mainItemView = new MainItemView({ model: new Backbone.Model() });

app.addRegions({ mainRegion: ".main" });

app.on("start", function() {
    Backbone.history.start({ pushState: true });

    this.mainRegion.show(this.mainItemView);
});

app.start();

module.exports = app;
