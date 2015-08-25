module.exports = function(grunt) {
	// Project configuration
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		
		watch: {
			js: {
				files: ['src/js/*.js'],
				tasks: ['concat:js'],
			},
			scss: {
				files: ['src/css/*.scss'],
				tasks: ['sass'],
			},
		},
		
		concat: {
			js: {
				src: ['src/js/main.js'],
				dest: 'build/js/app.js',
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
					{
						expand: true,
						cwd: 'src/css/',
						src: ['reset.css'],
						dest: 'build/css/',
					},
				],
			},
		},

		sass: {
			dist: {
				files: [
					{
						expand: true,
						cwd: 'src/',
						src: ['css/*.scss'],
						dest: 'build/',
						ext: '.css',
					}
				],
			}
		}
	});
	
	// Load plugins
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-sass');
	
	// Default task(s)
	grunt.registerTask('default', ['concat', 'sass', 'copy', 'watch']);
	grunt.registerTask('production', ['concat', 'sass', 'copy', 'watch']);
};