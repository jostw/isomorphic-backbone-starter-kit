/*
 * isomorphic-backbone-starter-kit
 *
 * https://github.com/jostw/isomorphic-backbone-starter-kit
 *
 * Copyright (c) 2015 jos
 * Licensed under the MIT license.
 */

"use strict";

var handlebars = require("handlebars");

var Template = function Template() {};

Template.prototype.render = function render(templateName, templateData, templateHandler) {
    var template = handlebars.partials[templateName];

    if (!template) {
        template = templateHandler(templateName);

        handlebars.registerPartial(templateName, template);
    }

    template = handlebars.compile(template);

    return template(templateData);
};

module.exports = new Template();
