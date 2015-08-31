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
                        dest: 'public/js',
                        filter: 'isFile',
                        expand: true,
                        flatten: true
                    },
                    {
                        cwd: 'bower_components/',
                        src: ['*/dist/**/*.map', '!*/dist/**/*.css.map'],
                        dest: 'public/js',
                        filter: 'isFile',
                        expand: true,
                        flatten: true
                    },
                    {
                        cwd: 'bower_components/',
                        src: '*/dist/**/*.css',
                        dest: 'public/css',
                        filter: 'isFile',
                        expand: true,
                        flatten: true
                    },
                    {
                        cwd: 'bower_components/',
                        src: '*/dist/**/*.css.map',
                        dest: 'public/css',
                        filter: 'isFile',
                        expand: true,
                        flatten: true
                    },
                    {
                        cwd: 'bower_components/',
                        src: '*/dist/**/fonts/**',
                        dest: 'public/fonts',
                        filter: 'isFile',
                        expand: true,
                        flatten: true
                    }
                ]
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
    grunt.loadNpmTasks('grunt-mocha-test');

    grunt.registerTask('test', ['env:test', 'jshint', 'mochaTest']);
    grunt.registerTask('smoketest', ['env:smoke', 'mochaTest']);
};
