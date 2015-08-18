var gulp = require('gulp'),

    uglify = require('gulp-uglify'),
    jshint = require('gulp-jshint'),
    jasmine = require('gulp-jasmine'), 
    karma = require('gulp-karma'),
    concat = require('gulp-concat'),

    paths = {
        scripts: "script/*.js",
        spec: "spec/*.js",
        angular: 'node_modules/angular/angular.js',
        angular_mocks:'node_modules/angular-mocks/angular-mocks.js',

         dist: "./dist"
    };

gulp.task('prepare', function () {
    return gulp.src(paths.scripts)
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(uglify())
        .pipe(concat('main.js'))
        .pipe(gulp.dest(paths.dist))
});

gulp.task('test', function () {
    gulp.src([paths.angular,paths.angular_mocks,paths.scripts, paths.spec])
        .pipe(karma({
            configFile: 'karma.conf.js',
            action: 'run'
        }));
});

gulp.task('watch', function () {
  gulp.watch(paths.scripts, ['prepare','test']);
  gulp.watch(paths.spec, ['prepare','test']);

});

gulp.task('default', ['watch','prepare', 'test']);