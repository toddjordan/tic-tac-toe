'use strict';


module.exports = function(config) {
  config.set({
    
    basePath : './',

    files: [
      'node_modules/angular/angular.js',
      'node_modules/angular-mocks/angular-mocks.js',
      'app/**/*.js'

    ],

    autoWatch: true,

    frameworks: ['jasmine'],

    browsers: ['Chrome'],

    plugins: [
      'karma-chrome-launcher',
      'karma-firefox-launcher',
      'karma-jasmine',
      'karma-junit-reporter',
      'karma-html-reporter',
      'karma-coverage'
    ],

    reporters: ['progress', 'html', 'coverage'],

    preprocessors: {
      'app/services/**/*.js': ['coverage']
    },

    coverageReporter: {
      type:['text-summary'], 
      dir: 'coverage/'
    },

    junitReporter : {
      outputFile: 'test_out/unit.xml',
      suite: 'unit'
    },

    htmlReporter: {
      outputDir:'karma_html',
      templatePath: __dirname+'/node_modules/karma-html-reporter/jasmine_template.html'
    }
    
  });
};

