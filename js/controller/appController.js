/*
 * isomorphic-backbone-starter-kit
 *
 * https://github.com/jostw/isomorphic-backbone-starter-kit
 *
 * Copyright (c) 2015 jos
 * Licensed under the MIT license.
 */

"use strict";

var routes = require("../app/routes");
var eventAggregator = require("../app/event");

module.exports = {
    homeHandler: function() {
        eventAggregator.trigger("set:route", routes.home);
    },

    aboutHandler: function() {
        eventAggregator.trigger("set:route", routes.about);
    }
};
