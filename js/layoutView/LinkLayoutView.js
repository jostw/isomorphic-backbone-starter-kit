/*
 * isomorphic-backbone-starter-kit
 *
 * https://github.com/jostw/isomorphic-backbone-starter-kit
 *
 * Copyright (c) 2015 jos
 * Licensed under the MIT license.
 */

"use strict";

var $ = require("jquery");
var Backbone = require("backbone");
var Marionette = require("backbone.marionette");

var LinkLayoutView = Marionette.LayoutView.extend({
    el: "a",

    events: {
        "click": "onClick"
    },

    onClick: function(e) {
        e.preventDefault();

        var link = $(e.target).closest("a").attr("href");

        Backbone.history.navigate(link, { trigger: true });
    }
});

module.exports = LinkLayoutView;
