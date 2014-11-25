module.exports = function(grunt) {
	
	grunt.initConfig({
		nodemon: {
			dev: {
				script: 'server.js'
			}
		},
		watch: {
			scripts: {
				files: ['dev/js/*.js', 'server.js'],
				tasks: ['uglify:my_target', 'nodemon'],
				options: {
					spawn: false,
				}
			}
		},
		uglify: {
			my_target: {
				files: {
					'dist/js/built.min.js': ['dev/js/jquery-1.11.1.min.js', 'dev/js/jquery.ui.widget.js', 'jquery.iframe-transport.js',
						'dev/js/jquery.fileupload.js', 'dev/js/script.js']
				}
			}
		}
	});

	grunt.registerTask('default', ['uglify', 'nodemon', 'watch']);

	grunt.loadNpmTasks('grunt-nodemon');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-uglify');

};