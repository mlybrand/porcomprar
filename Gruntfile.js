module.exports = function(grunt) {

    grunt.initConfig({
        env: {
            dev: {
                NODE_ENV: 'development'
            },
            prod: {
                NODE_ENV: 'production'
            }
        },
        jshint: {
            options: {
               expr: true
            },
            all: ['*.js', 'test/**/*.js', 'config/**/*.js']
        },
        mochaTest: {
            test: {
                src: ['test/**/*.js']
            }
        }
    });

    grunt.loadNpmTasks('grunt-env');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-mocha-test');

    grunt.registerTask('test', ['env:dev', 'jshint', 'mochaTest']);
    grunt.registerTask('smoketest', ['env:prod', 'mochaTest']);

};
