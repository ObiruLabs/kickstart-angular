module.exports = function(grunt) {
    var i;
    var commonDependencies = [
            'common', 'jquery', 'angular.min', 'angular-animate.min', 'angular-resource.min',
            'angular-sanitize.min', 'angular-spinner', 'app'
        ],
        indexDependencies = [
            'vendor/jquery.unveil.min', 'vendor/bootstrap'
        ],
        appDependencies = [];

    for (i = 0; i < commonDependencies.length; i++) {
        commonDependencies[i] = 'js/vendor/' + commonDependencies[i] + '.js';
    }

    for (i = 0; i < indexDependencies.length; i++) {
        indexDependencies[i] = 'js/' + indexDependencies[i] + '.js';
    }

    for (i = 0; i < appDependencies.length; i++) {
        appDependencies[i] = 'js/' + appDependencies[i] + '.js';
    }

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        watch: {
            haml: {
              files: ['**/*.haml'],
              tasks: ['haml']
            },
            sass: { 
              files: ['**/*.sass'],
              tasks: ['sass']
            },
        },
        sass: {
            dist: {
                options: {
                    style: 'expanded'
                },
                files: [{
                    expand: true,
                    src: 'css/*.scss',
                    ext: '.css'
                }]
            }
        },
        haml: {
            dist: {
                files: [{
                    expand: true,
                    src: "**/*.haml",
                    ext: ".html"
                }]
            }
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
                mangle: false
            },
            dependencies: {
              files: {
                'dist/common.min.js': commonDependencies,
                'dist/index.min.js': indexDependencies,
                'dist/app.min.js': appDependencies
              }
            },
            app: {
                files: [{
                    expand: true,
                    src: 'dist/application*.js'
                }]
            }
        },
        cssmin: {
            minify: {
                expand: true,
                src: ['dist/*.css']
            }
        },
        filerev: {
            options: {
                encoding: 'utf8',
                algorithm: 'md5',
                length: 8
            },
            all: {
                src: 'dist/*.{js,css}'
            },
            css: {
                src: 'css/application.css',
                dest: 'dist'
            },
            app: {
                src: 'js/application.js',
                dest: 'dist'
            }
        },
        clean: ['dist'],
        userev: {
            options: {
                hash: /(\.[a-z0-9]{8})/
            },
            js: {
                src: ['dist/application*.js'],
                options: {
                    patterns: {
                        'Linking common dependencies': /(dist\/common\.min\.js)/,
                        'Linking index dependencies': /(dist\/index\.min\.js)/,
                        'Linking app dependencies': /(dist\/app\.min\.js)/
                    }
                }
            },
            html: {
                files: [{
                    expand: true,
                    src: "**/*.html"
                }],
                options: {
                    patterns: {
                        'Linking application': /([a-z]+\/application.*\.js)/,
                        'Linking css': /([a-z]+\/application.*\.css)/
                    }
                }
            }
        }
    });
    
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-haml');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-filerev');
    grunt.loadNpmTasks('grunt-userev');

    // Run tasks
    // Clean out the dist directory
    // Compile the dependencies that are pull in automatically
    // Version all assets
    // Link the versioned assets
    // Compile the versioned assets
    grunt.registerTask('default', ['sass', 'haml', 'clean', 'uglify:dependencies', 'filerev', 'userev', 'uglify:app']);

};
