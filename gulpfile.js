var gulp = require("gulp");
var typescript = require("gulp-tsc");
//var typings = require("gulp-tsd");

gulp.task("default", function(){
  gulp.src(["src/**/*.ts"])
    .pipe(typescript())
    .pipe(gulp.dest("build"));
});
