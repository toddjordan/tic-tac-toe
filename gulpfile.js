'use strict';

var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var jshint = require('gulp-jshint');
var karma = require('karma').server;
var files = ['./app/**/*.js'];

gulp.task('default',['lint','test']);

gulp.task('start', function () {
  nodemon({
    script: 'server.js',
    ext: 'js html', 
    env: { 'NODE_ENV': 'development' }
  });


});

gulp.task('lint', function () {
  gulp.src(files).
    pipe(jshint()).
    pipe(jshint.reporter('jshint-stylish'), {verbose:true});
});


gulp.task('test', function(done) {
  karma.start({
    configFile: __dirname + '/karma.conf.js',
    singleRun:true
  }, done);
});

gulp.task('tdd', function(done) {
  karma.start({
    configFile: __dirname + '/karma.conf.js'
  }, done);
});

gulp.task('watch', function() {
  gulp.watch(files, ['lint', 'test']);
});


