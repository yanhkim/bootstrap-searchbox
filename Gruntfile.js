module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            options: {
                separator: ';'
            },
            dist: {
                src: ['src/**/*.js'],
                dest: 'dist/<%= pkg.name %>.js'
            }
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            dist: {
                files: {
                    'dist/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
                }
            }
        },
        jshint: {
            files: ['Gruntfile.js', 'src/**/*.js', 'test/specs/**/*.js']
        },
        jasmine: {
            test: {
                src: ['src/**/*.js'],
                options: {
                    specs: ['test/specs/**/*.js'],
                    vendor: ['test/vendor/**/*.js'],
                    styles: ['test/vendor/**/*.css', 'src/**/*.css']
                }
            },
            coverage: {
                src: ['src/**/*.js'],
                options: {
                    specs: ['test/specs/**/*.js'],
                    vendor: ['test/vendor/**/*.js'],
                    styles: ['test/vendor/**/*.css', 'src/**/*.css'],
                    template: require('grunt-template-jasmine-istanbul'),
                    templateOptions: {
                        coverage: 'output/coverage/coverage.json',
                        report: 'output/coverage'
                    }
                }
            }
        },
        watch: {
            files: ['<%= jshint.files %>'],
            tasks: ['jshint', 'jasmine:test']
        },
        csslint: {
            options: {
                'adjoining-classes': false
            },
            src: ['src/**/*.css']
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-csslint');

    grunt.registerTask('test', ['jshint', 'csslint', 'jasmine:test']);
    grunt.registerTask('cover', ['jshint', 'csslint', 'jasmine:coverage']);

    grunt.registerTask('default', ['jshint', 'csslint', 'concat', 'uglify']);

};
