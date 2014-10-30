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
    wiredep = require("wiredep").stream,

    plugins = require("gulp-load-plugins")(),

    paths = {
        html: {
            src:   "views/**/*.hbs",
            index: "views/layouts/index.hbs"
        },

        js: {
            app: "app.js"
        }
    };

gulp.task("html", function() {
    return gulp.src([paths.html.src, "!"+ paths.html.index])
               .pipe(plugins.livereload());
});

gulp.task("index", function() {
    return gulp.src(paths.html.index)
               .pipe(wiredep())
               .pipe(gulp.dest("views/layouts/"))
               .pipe(plugins.livereload());
});

gulp.task("reload", function() {
    return gulp.src(paths.js.app)
               .pipe(plugins.livereload());
});

gulp.task("watch", ["reload"], function() {
    gulp.watch([paths.html.src, "!"+ paths.html.index], ["html"]);
    gulp.watch(paths.html.index, ["index"]);
});

gulp.task("nodemon", function() {
    plugins.livereload.listen();

    plugins.nodemon({
        script: paths.js.app,
        ext: "js",
        ignore: ["gulpfile.js"]
    })
    .on("start", ["watch"]);
});

gulp.task("default", ["nodemon"]);
