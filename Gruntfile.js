module.exports = function(grunt) {

    grunt.initConfig({
        env: {
            dev: {
                NODE_ENV: 'development'
            },
            test: {
                NODE_ENV: 'test'
            },
            smoke: {
                NODE_ENV: 'smoke'
            },
            prod: {
                NODE_ENV: 'production'
            }
        },
        jshint: {
            options: {
               expr: true
            },
            all: ['*.js', 'lib/**/*.js', 'test/**/*.js', 'config/**/*.js']
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

    grunt.registerTask('test', ['env:test', 'jshint', 'mochaTest']);
    grunt.registerTask('smoketest', ['env:smoke', 'mochaTest']);

};
