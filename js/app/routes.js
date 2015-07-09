/*
 * isomorphic-backbone-starter-kit
 *
 * https://github.com/jostw/isomorphic-backbone-starter-kit
 *
 * Copyright (c) 2015 jos
 * Licensed under the MIT license.
 */

"use strict";

module.exports = {
    about: {
        url: "/about",
        template: "about.hbs",
        handler: "aboutHandler"
    },

    home: {
        url: "/",
        template: "home.hbs",
        handler: "homeHandler"
    }
};
