/*
 * isomorphic-backbone-starter-kit
 *
 * https://github.com/jostw/isomorphic-backbone-starter-kit
 *
 * Copyright (c) 2015 jos
 * Licensed under the MIT license.
 */

"use strict";

var _ = require("underscore");
var Marionette = require("backbone.marionette");

var routes = require("../app/routes");
var appController = require("../controller/appController");

var AppRouter = Marionette.AppRouter.extend({
    controller: appController,

    appRoutes: (function() {
        var appRoutes = {};

        _.each(routes, function(route) {
            var routeUrl = route.url.split("/")[1] || "*action";

            appRoutes[routeUrl] = route.handler;
        });

        return appRoutes;
    })()
});

module.exports = AppRouter;
