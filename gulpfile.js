var gulp = require("gulp");
var typescript = require("gulp-tsc");
var mocha = require("gulp-mocha");

gulp.task("default", ['test'],function(){
  return gulp.src(["src/**/*.ts","typings/**/*.ts"])
    .pipe(typescript())
    .pipe(gulp.dest("build"));
});

gulp.task("compile-test", function(){
  return gulp.src(["test/**/*.ts","typings/**/*.ts"])
    .pipe(typescript())
    .pipe(gulp.dest("build-test"));
});

gulp.task("test", ['compile-test'],function(){
  return gulp.src(["build-test/**/*.js"])
    .pipe(mocha())
    .pipe(gulp.dest("build-test"));
});
