module.exports = function(grunt) {

  // Project configuration
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    
    concat: {
      js: {
        src: ['sources/js/main.js', 'sources/js/backToTop.js'],
        dest: 'build/js/app.js',
      },
      css: {
        src: ['sources/css/reset.css', 'sources/css/main.css', 'sources/css/backToTop.css'],
        dest: 'build/css/style.css',
      },
    },
    
    watch: {
      js: {
        files: ['sources/js/*.js'],
        tasks: ['concat'],
        options: {
          spawn: false,
        },
      },
      css: {
        files: ['sources/css/*.css'],
        tasks: ['concat'],
        options: {
          spawn: false,
        },
      },
    },

  });

  // Load plugins
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // Default task(s)
  grunt.registerTask('default', ['concat', 'watch']);

};