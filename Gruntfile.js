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
				tasks: ['sass', 'concat:css', 'cssmin'],
			},
		},
		
		concat: {
			js: {
				src: ['src/js/main.js'],
				dest: 'build/js/app.js',
			},
			css: {
				src: ['src/css/reset.css', 'build/css/style.css'],
				dest: 'build/css/style.css',
			},
		},
		
		copy: {
			main: {
				files: [
					{
						expand: true,
						cwd: 'src/',
						src: ['img/**'],
						dest: 'build/',
					},
				],
			},
		},

		sass: {
			dist: {
				options: {
					style: 'expanded',
					lineNumbers: true,
					sourcemap: 'none'
				},
				files: [{
					expand: true,
					cwd: 'src/',
					src: ['css/*.scss'],
					dest: 'build/',
					ext: '.css',
				}],
			},
		},

		cssmin: {
			main: {
				files: [{
					expand: true,
					cwd: 'build/css/',
					src: ['*.css', '!*.min.css'],
					dest: 'build/css/',
					ext: '.min.css',
				}],
			},
		},
	});
	
	// Load plugins
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	
	// Default task(s)
	grunt.registerTask('default', ['sass', 'concat', 'cssmin', 'copy']);
	grunt.registerTask('dev', ['sass', 'concat', 'cssmin', 'copy', 'watch']);
};
