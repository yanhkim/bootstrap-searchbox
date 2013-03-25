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
          styles: ['src/**/*.css']
        }
      },
      coverage: {
        src: ['src/**/*.js'],
        options: {
          specs: ['test/specs/**/*.js'],
          vendor: ['test/vendor/**/*.js'],
          styles: ['src/**/*.css'],
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
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('test', ['jshint', 'jasmine:test']);
  grunt.registerTask('cover', ['jshint', 'jasmine:coverage']);

  grunt.registerTask('default', ['jshint', 'concat', 'uglify']);

};
