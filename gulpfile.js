/*
 * ajax-seo-starter-kit
 *
 * https://github.com/jostw/ajax-seo-starter-kit
 *
 * Copyright (c) 2014 jos
 * Licensed under the MIT license.
 */

"use strict";

var gulp =       require("gulp"),
    plugins =    require("gulp-load-plugins")(),

    browserify = require("browserify"),
    source =     require("vinyl-source-stream"),

    paths = {
        html: {
            src:   "views/**/*.hbs",
            index: "views/layouts/index.hbs"
        },

        js: {
            src: "assets/js/app.js",
            app: "app.js"
        }
    };

gulp.task("html", function() {
    return gulp.src(paths.html.src)
               .pipe(plugins.livereload({ auto: false }));
});

gulp.task("js", function() {
    return browserify("./"+ paths.js.src)
            .bundle()
            .pipe(source("script.js"))
            .pipe(gulp.dest("public/js/"))
            .pipe(plugins.livereload({ auto: false }));
});

gulp.task("watch", function() {
    gulp.watch(paths.html.src, ["html"]);
    gulp.watch(paths.js.src,   ["js"]);
});

gulp.task("nodemon", function() {
    plugins.livereload.listen();

    plugins.nodemon({
        script: paths.js.app,
        ext: "js",
        ignore: [
            "gulpfile.js",
            "{assets,public}/**/*.js"
        ]
    })
    .on("start", ["watch"]);
});

gulp.task("default", ["nodemon"]);
