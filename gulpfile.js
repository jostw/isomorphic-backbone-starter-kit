/*
 * isomorphic-backbone-starter-kit
 *
 * https://github.com/jostw/isomorphic-backbone-starter-kit
 *
 * Copyright (c) 2015 jos
 * Licensed under the MIT license.
 */

"use strict";

var gulp = require("gulp");
var plugins = require("gulp-load-plugins")();

var wiredep = require("wiredep");

var browserify = require("browserify");
var source = require("vinyl-source-stream");

gulp.task("copy:vendor", function() {
    gulp.src([
        "bower_components/html5shiv/dist/html5shiv.min.js",
        "bower_components/respond/dest/respond.min.js"
    ])
    .pipe(gulp.dest("public/js/vendor/"));
});

gulp.task("copy:bower", function() {
    gulp.src([
        "bower_components/**/*.{css,js}",
        "!bower_components/{html5shiv,respond,modernizr}/**/*.{css,js}"
    ])
    .pipe(gulp.dest("public/bower_components/"));
});

gulp.task("uglify:modernizr", function() {
    gulp.src([
        "bower_components/modernizr/modernizr.js"
    ])
    .pipe(plugins.uglify())
    .pipe(plugins.rename("modernizr.min.js"))
    .pipe(gulp.dest("public/js/vendor/"));
});

gulp.task("build:html", ["copy:bower"], function() {
    gulp.src([
        "template/index.hbs"
    ])
    .pipe(wiredep.stream({
        ignorePath: "..",
        exclude: /html5shiv|respond|modernizr/
    }))
    .pipe(plugins.inject(gulp.src([
        "template/*.hbs",
        "!template/index.hbs"
    ]), {
        starttag: "<!-- inject:hbs -->",
        transform: function(filePath, file) {
            var fileName = filePath.match("template/(.+).hbs")[1];

            return "<script id='template-" + fileName + "' type='text/template'>" + file.contents.toString("utf8") + "</script>";
        }
    }))
    .pipe(gulp.dest("public/"));
});

gulp.task("build:css", function() {
    gulp.src([
        "scss/style.scss"
    ])
    .pipe(plugins.sass().on("error", plugins.sass.logError))
    .pipe(plugins.autoprefixer())
    .pipe(gulp.dest("public/css/"));
});

gulp.task("build:js", function() {
    browserify("./js/app.js")
        .bundle()
        .pipe(source("script.js"))
        .pipe(gulp.dest("public/js/"));
});

gulp.task("watch", ["copy:vendor", "uglify:modernizr"], function() {
    gulp.watch("template/*.hbs", ["build:html"]);

    gulp.watch("scss/**/*.scss", ["build:css"]);

    gulp.watch("js/**/*.js", ["build:js"]);

    gulp.watch([
        "app.js",
        "public/index.hbs",
        "public/css/style.css",
        "public/js/script.js"
    ]).on("change", function(file) {
        plugins.livereload.changed(file.path);
    });
});

gulp.task("default", ["watch"], function() {
    plugins.livereload.listen();

    plugins.nodemon({
        script: "app.js",
        ext: "js hbs",
        ignore: [
            "gulpfile.js",
            "node_modules/",
            "bower_components/",
            "public/"
        ]
    });
});

gulp.task("build", [
    "copy:vendor", "uglify:modernizr",
    "build:html", "build:css", "build:js"
]);
