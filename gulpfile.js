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
var del = require("del");

var browserify = require("browserify");
var source = require("vinyl-source-stream");

gulp.task("copy:vendor", function() {
    return gulp.src([
        "bower_components/html5shiv/dist/html5shiv.min.js",
        "bower_components/respond/dest/respond.min.js"
    ])
    .pipe(gulp.dest("public/js/vendor/"));
});

gulp.task("uglify:modernizr", function() {
    return gulp.src([
        "bower_components/modernizr/modernizr.js"
    ])
    .pipe(plugins.uglify())
    .pipe(plugins.rename("modernizr.min.js"))
    .pipe(gulp.dest("public/js/vendor/"));
});

gulp.task("copy:bower", function() {
    return gulp.src([
        "bower_components/**/*.{css,js}",
        "!bower_components/{html5shiv,respond,modernizr}/**/*.{css,js}"
    ])
    .pipe(gulp.dest("public/bower_components/"));
});

gulp.task("min:partial", function() {
    return gulp.src([
        "template/*.hbs",
        "!template/index.hbs"
    ])
    .pipe(plugins.htmlmin({
        collapseWhitespace: true,
        removeComments: true
    }))
    .pipe(gulp.dest("template/min/"));
});

gulp.task("build:html", ["copy:vendor", "uglify:modernizr", "copy:bower", "min:partial"], function() {
    return gulp.src([
        "template/index.hbs"
    ])
    .pipe(plugins.htmlhint(".htmlhintrc"))
    .pipe(plugins.htmlhint.failReporter())
    .pipe(wiredep.stream({
        ignorePath: "..",
        exclude: /html5shiv|respond|modernizr/
    }))
    .pipe(gulp.dest("public/"));
});

gulp.task("clean:build", function() {
    return del([
        "public/css/style-*.css",
        "public/js/script-*.js"
    ]);
});

gulp.task("build:css", ["clean:build"], function() {
    return gulp.src([
        "scss/style.scss"
    ])
    .pipe(plugins.sass().on("error", plugins.sass.logError))
    .pipe(plugins.csslint(".csslintrc"))
    .pipe(plugins.csslint.reporter())
    .pipe(plugins.csslint.failReporter())
    .pipe(plugins.autoprefixer())
    .pipe(gulp.dest("public/css/"));
});

gulp.task("lint:js", function() {
    return gulp.src([
        "gulpfile.js",
        "app.js",
        "js/**/*.js",
        "!js/vendor/*.js"
    ])
    .pipe(plugins.jshint())
    .pipe(plugins.jshint.reporter("jshint-stylish"))
    .pipe(plugins.jshint.reporter("fail"))
    .pipe(plugins.eslint())
    .pipe(plugins.eslint.format())
    .pipe(plugins.eslint.failOnError())
    .pipe(plugins.jscs());
});

gulp.task("build:js", ["clean:build", "lint:js"], function() {
    return browserify([
        "./js/app.js"
    ])
    .bundle()
    .pipe(source("script.js"))
    .pipe(gulp.dest("public/js/"));
});

gulp.task("min", ["build:html", "build:css", "build:js"], function() {
    return gulp.src([
        "public/index.hbs"
    ])
    .pipe(plugins.usemin({
        path: "public/",

        html: [
            plugins.htmlmin({
                collapseWhitespace: true,
                removeComments: true,
                minifyJS: true
            })
        ],

        css: [
            plugins.cssmin(),
            plugins.rev()
        ],

        js: [
            plugins.uglify(),
            plugins.rev()
        ]
    }))
    .pipe(gulp.dest("public/"));
});

gulp.task("clean:min", ["min"], function() {
    return del([
        "public/bower_components/",
        "public/css/style.css",
        "public/js/script.js"
    ]);
});

gulp.task("watch", ["build:html", "build:css", "build:js"], function() {
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

gulp.task("build", ["min", "clean:min"]);
