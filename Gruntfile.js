module.exports = function(grunt) {

    grunt.initConfig({
        jshint: {
            options: {
               expr: true
            },
            all: ['*.js', 'test/**/*.js']
        },
        mochaTest: {
            test: {
                src: ['test/**/*.js']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-mocha-test');

    grunt.registerTask('test', ['jshint', 'mochaTest']);
};
