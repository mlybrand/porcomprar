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
            all: ['*.js', 'test/**/*.js']
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

    grunt.registerTask('test', ['jshint', 'mochaTest']);
    grunt.registerTask('foo', function() {
        console.log(process.env.NODE_ENV);
    });
    grunt.registerTask('bar', ['env:dev', 'foo']);
    grunt.registerTask('baz', ['env:prod', 'foo']);
};
