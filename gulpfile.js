/*
 * ajax-seo-starter-kit
 *
 * https://github.com/jostw/ajax-seo-starter-kit
 *
 * Copyright (c) 2014 jos
 * Licensed under the MIT license.
 */

"use strict";

var gulp =    require("gulp"),
    wiredep = require("wiredep").stream;

gulp.task("html", function() {
    return gulp.src("views/layouts/index.hbs")
               .pipe(wiredep())
               .pipe(gulp.dest("views/layouts/"));
});

gulp.task("watch", function() {
    gulp.watch("views/**/*.hbs", ["html"]);
});

gulp.task("default", ["html", "watch"]);
