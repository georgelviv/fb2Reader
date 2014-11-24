module.exports = function(grunt) {
	
	grunt.initConfig({
		nodemon: {
			dev: {
				script: 'server.js'
			}
		},
		watch: {
			scripts: {
				files: ['dist/js/*.js', 'server.js'],
				tasks: ['uglify', 'nodemon']
			}
		},
		uglify: {
			my_target: {
				files: {
					'dist/js/built.min.js': ['dist/js/jquery-1.11.1.min.js', 'dist/js/jquery.ui.widget.js', 'jquery.iframe-transport.js',
						'dist/js/jquery.fileupload.js', 'dist/js/script.js']
				}
			}
		}
	});

	grunt.registerTask('default', ['uglify', 'nodemon', 'watch']);

	grunt.loadNpmTasks('grunt-nodemon');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-uglify');

};