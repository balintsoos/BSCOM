module.exports = function(grunt) {
	// Project configuration
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		watch: {
			js: {
				files: ['src/js/*.js'],
				tasks: ['concat:js'],
			},
			css: {
				files: ['src/css/*.css'],
				tasks: ['concat:css'],
			},
		},
		concat: {
			js: {
				src: ['src/js/main.js', 'src/js/backToTop.js'],
				dest: 'build/js/app.js',
			},
			css: {
				src: ['src/css/reset.css', 'src/css/main.css', 'src/css/backToTop.css'],
				dest: 'build/css/style.css',
			},
		},
		copy: {
			main: {
				files: [
					{
						expand: true,
						cwd: 'src/',
						src: ['font/**'],
						dest: 'build/',
					},
					{
						expand: true,
						cwd: 'src/',
						src: ['img/**'],
						dest: 'build/',
					},
					{
						expand: true,
						cwd: 'src/js/',
						src: ['*.min.js'],
						dest: 'build/js/',
					},
				],
			},
		},
	});
	// Load plugins
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	// Default task(s)
	grunt.registerTask('default', ['concat', 'copy', 'watch']);
};