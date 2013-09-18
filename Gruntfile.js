var EXAMPLE_PATH = 'examples';

var LIVERELOAD_PORT = 35729;
var lrSnippet = require('connect-livereload')({ port: LIVERELOAD_PORT });
var mountFolder = function (connect, dir) {
  return connect.static(require('path').resolve(dir));
};

module.exports = function(grunt) {
  grunt.initConfig({
    appRoot: EXAMPLE_PATH,
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      options: {
        curly: true,
        multistr: true,
        expr: true,
        boss: true
      },
      beforeuglify: {
        src: '<%= appRoot %>/{,**/}*.js'
      },
      gruntfile: ['Gruntfile.js']
    },
    watch: {
      gruntfile: {
        files: 'Gruntfile.js',
        tasks: ['jshint:gruntfile']
      },
      example: {
        files: ['<%= appRoot %>/{,**/}*.js'],
        tasks: ['newer:jshint']
      },
      livereload: {
        options: {
          livereload: LIVERELOAD_PORT
        },
        files: [
          '<%= appRoot %>/{,**/}*.{html,js,css}'
        ]
      }
    },
    connect: {
      options: {
        port: 9000,
        // Change this to '0.0.0.0' to access the server from outside.
        hostname: 'localhost'
      },
      livereload: {
        options: {
          middleware: function (connect) {
            return [
              lrSnippet,
              mountFolder(connect, EXAMPLE_PATH),
              connect.directory(EXAMPLE_PATH)
            ];
          }
        }
      }
    },
    open: {
      server: {
        url: 'http://<%= connect.options.hostname %>:<%= connect.options.port %>'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-newer');
  grunt.loadNpmTasks('grunt-open');

  grunt.registerTask('server', ['connect:livereload', 'open', 'watch']);

  grunt.registerTask('default', ['server']);
};

