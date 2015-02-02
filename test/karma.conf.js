module.exports = function (config) {
    config.set({

        basePath: '../',

        files: [
            'app/js/**/*.js',
            'test/unit/**/*Spec.js'
        ],

        preprocessors: {
            'app/**/*.js': ['6to5'],
            'test/unit/**/*.js': ['6to5']
        },
        '6to5Preprocessor': {
            options: {
                sourceMap: 'inline'
            },
            filename: function(file) {
                return file.originalPath.replace(/\.js$/, '.es5.js');
            },
            sourceFileName: function(file) {
                return file.originalPath;
            }
        },

        autoWatch: true,

        singleRun: false,

        frameworks: [
            'jasmine',
            'jasmine-matchers'
        ],

        browsers: ['PhantomJS'],

        junitReporter: {
            outputFile: 'test_out/unit.xml',
            suite: 'unit'
        }

    });
};