/*
 * isomorphic-backbone-starter-kit
 *
 * https://github.com/jostw/isomorphic-backbone-starter-kit
 *
 * Copyright (c) 2015 jos
 * Licensed under the MIT license.
 */

"use strict";

var Marionette = require("backbone.marionette");

var eventAggregator = require("../app/event");

var MainItemView = Marionette.ItemView.extend({
    initialize: function() {
        this.listenTo(this.model, "change", this.render);

        eventAggregator.on("set:route", this.setRoute.bind(this));
    },

    setRoute: function(route) {
        this.template = route.template;
        this.model.url = route.url;

        this.model.fetch();
    }
});

module.exports = MainItemView;
