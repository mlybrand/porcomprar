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
        copy: {
            main: {
                files: [
                    {
                        cwd: 'bower_components/',
                        src: ['*/dist/**/*.js', '!*/dist/**/npm.js'],
                        dest: 'public/vendor/js',
                        filter: 'isFile',
                        expand: true,
                        flatten: true
                    },
                    {
                        cwd: 'bower_components/',
                        src: ['*/dist/**/*.map', '!*/dist/**/*.css.map'],
                        dest: 'public/vendor/js',
                        filter: 'isFile',
                        expand: true,
                        flatten: true
                    },
                    {
                        cwd: 'bower_components/',
                        src: '*/dist/**/*.css',
                        dest: 'public/vendor/css',
                        filter: 'isFile',
                        expand: true,
                        flatten: true
                    },
                    {
                        cwd: 'bower_components/',
                        src: '*/dist/**/*.css.map',
                        dest: 'public/vendor/css',
                        filter: 'isFile',
                        expand: true,
                        flatten: true
                    },
                    {
                        cwd: 'bower_components/',
                        src: '*/dist/**/fonts/**',
                        dest: 'public/vendor/fonts',
                        filter: 'isFile',
                        expand: true,
                        flatten: true
                    }
                ]
            }
        },
        clean: ['public/vendor/**'],
        execute: {
           target: {
               src: ['server.js']
           }
        },
        mochaTest: {
            test: {
                src: ['test/**/*.js']
            }
        }
    });

    grunt.loadNpmTasks('grunt-env');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-mocha-test');
    grunt.loadNpmTasks('grunt-execute');

    grunt.registerTask('test', ['copy', 'env:test', 'jshint', 'mochaTest']);
    grunt.registerTask('smoketest', ['env:smoke', 'mochaTest']);
    grunt.registerTask('start:dev', ['env:dev', 'execute']);
};
