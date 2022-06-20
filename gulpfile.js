// move my html
// Compile the JS using webpack
// watch
// default task (gulp)

const gulp = require('gulp')
const browserSync = require('browser-sync').create()
const webpack = require('webpack-stream')

gulp.task("html", function () {
    return gulp.src("src/*.html")
        .pipe(gulp.dest("dist"))
})

gulp.task("js", function () {
    return gulp.src("src/js/*")
        .pipe(
            webpack({
                mode: 'production',
                devtool: 'source-map',
                output: {
                    filename: "app.js"
                }
            })
        )
        .pipe(gulp.dest("dist/js"))
        .pipe(browserSync.stream())
})

gulp.task("watch", function () {

    browserSync.init({
        server: {
            baseDir: "dist"
        }
    })

    gulp.watch("src/*.html", gulp.series("html")).on("change", browserSync.reload)
    gulp.watch("src/js/*", gulp.series("js"))
})

gulp.task('default', gulp.series("html", "js", "watch"));