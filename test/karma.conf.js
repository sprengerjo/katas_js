module.exports = function(config){
    config.set({

        basePath : '../',

        files : [
            'app/js/**/*.js',
            'test/unit/**/*Spec.js'
        ],

        autoWatch: true,

        singleRun: false,

        frameworks: ['jasmine'],

        browsers : ['Chrome','PhantomJS'],

        plugins : [
            'karma-phantomjs-launcher',
            'karma-chrome-launcher',
            'karma-jasmine'
        ],

        junitReporter : {
            outputFile: 'test_out/unit.xml',
            suite: 'unit'
        }

    });
};