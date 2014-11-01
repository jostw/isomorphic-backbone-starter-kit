/*
 * ajax-seo-starter-kit
 *
 * https://github.com/jostw/ajax-seo-starter-kit
 *
 * Copyright (c) 2014 jos
 * Licensed under the MIT license.
 */

"use strict";

var gulp =        require("gulp"),
    wiredep =     require("wiredep").stream,
    runSequence = require("run-sequence"),

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

gulp.task("copy", function() {
    gulp.src([
            "bower_components/**/*.{css,js}",
            "!bower_components/jquery/**/*"
        ])
        .pipe(gulp.dest("public/bower_components/"));

    return gulp.src("bower_components/jquery/dist/jquery.min.js")
               .pipe(gulp.dest("public/js/"));
});

gulp.task("index", ["copy"], function() {
    return gulp.src(paths.html.index)
               .pipe(plugins.changed("views/layouts/"))
               .pipe(wiredep({
                    ignorePath: "../../",
                    exclude: ["jquery"]
               }))
               .pipe(gulp.dest("views/layouts/"));
});

gulp.task("reload", function() {
    return gulp.src(paths.js.app)
               .pipe(plugins.livereload());
});

gulp.task("watch", ["reload"], function() {
    gulp.watch([paths.html.src, "!"+ paths.html.index], function() {
        runSequence("reload");
    });

    gulp.watch(paths.html.index, function() {
        runSequence("index", "reload");
    });
});

gulp.task("nodemon", function() {
    plugins.nodemon({
        script: paths.js.app,
        ext: "js",
        ignore: ["gulpfile.js", "public/**/*.js"]
    })
    .on("start", ["watch"]);
});

gulp.task("default", ["nodemon"]);
