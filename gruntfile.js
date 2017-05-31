/*jslint node: true, nomen: true, plusplus: true */
module.exports = function (grunt) {
    'use strict';

    if (!grunt.file.exists('node_modules')) {
        grunt.fail.fatal('You must run "npm install" before using Blackbaud Stache.');
    }

    // Load tasks.
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('blackbaud-stache');

    // Configure tasks.
    grunt.config.merge({
        concat: {
            azure: {
                src: [
                    'static/assets/css/azure.css',
                    'static/assets/css/custom.css'
                ],
                dest: 'static/assets/css/azure.css'
            }
        },
        cssmin: {
            azure: {
                files: {
                    'static/assets/css/azure.min.css': ['static/assets/css/azure.css']
                }
            }
        },
        sass: {
            azure: {
                options: {
                    outputStyle: 'compressed',
                    includePaths: ['node_modules/blackbaud-stache/bower_components/']
                },
                files: [
                    {
                        expand: true,
                        cwd: 'static/azure/sass',
                        src: ['*.scss'],
                        dest: 'static/assets/css',
                        ext: '.css'
                    },
                    {
                        'static/assets/css/bb-omnibar-search.min.css': 'node_modules/blackbaud-stache/src/vendor/bb-omnibar-search/sass/bb-omnibar-search.scss'
                    }
                ]
            }
        },
        uglify: {
            azure: {
                files: {
                    'static/assets/js/azure.min.js': [
                        'node_modules/blackbaud-stache/src/js/libs/easyXDM.min.js',
                        'node_modules/blackbaud-stache/src/vendor/bb-omnibar-search/js/bb-omnibar-search.js',
                        'node_modules/blackbaud-stache/src/vendor/bb-omnibar-search/js/bb-omnibar-search.templates.js',
                        'static/azure/scripts/azure-app.js',
                        'static/azure/scripts/azure-jquery.js'
                    ],
                    'static/assets/js/bb-omnibar-search.min.js': [
                        'node_modules/blackbaud-stache/src/vendor/bb-omnibar-search/js/bb-omnibar-search.js',
                        'node_modules/blackbaud-stache/src/vendor/bb-omnibar-search/js/bb-omnibar-search.templates.js'
                    ],
                    'static/assets/js/angular-local-storage.min.js': [
                        'node_modules/angular-local-storage/src/angular-local-storage.js'
                    ]
                }
            }
        }
    });

    // Register tasks.
    grunt.task.registerTask('azure', function () {
        if (!grunt.file.exists('node_modules/blackbaud-stache/bower_components')) {
            grunt.fail.fatal('You must run `bower install` within node_modules/blackbaud-stache before generating the Azure files.');
            return;
        }
        grunt.task.registerTask('createselectscss', function () {
            grunt.file.copy('node_modules/blackbaud-stache/bower_components/angular-ui-select/dist/select.min.css', 'node_modules/blackbaud-stache/bower_components/angular-ui-select/dist/select.min.scss');
            grunt.file.copy('static/assets/css/custom.css', 'static/assets/css/custom.scss');
        });
        grunt.task.registerTask('cleanselectscss', function () {
            grunt.file.delete('node_modules/blackbaud-stache/bower_components/angular-ui-select/dist/select.min.scss');
            grunt.file.delete('static/assets/css/custom.scss');
        });
        grunt.task.run('createselectscss');
        grunt.task.run('sass:azure');
        grunt.task.run('concat:azure');
        grunt.task.run('cssmin:azure');
        grunt.task.run('uglify:azure');
        grunt.task.run('cleanselectscss');
    });
    grunt.task.registerTask('default', function () {
        grunt.task.run('stache');
    });
};
