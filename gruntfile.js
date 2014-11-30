module.exports = function(grunt) {
	
	grunt.initConfig({
		nodemon: {
			dev: {
				script: 'server.js'
			}
		},
		watch: {
			scripts: {
				files: ['dev/frontJs/*.js'],
				tasks: ['uglify:my_target'],
				options: {
					spawn: false,
				}
			},
			less: {
				files: ['dev/less/*.less'],
				tasks: ['less']
			}
		},
		uglify: {
			my_target: {
				files: {
					'dist/js/built.min.js': ['dev/frontJs/jquery-1.11.1.min.js', 'dev/frontJs/jquery.ui.widget.js',
					'jquery.iframe-transport.js', 'dev/frontJs/jquery.fileupload.js', 'dev/frontJs/script.js']
				}
			}
		},
		less: {
			development: {
				files: {
					"dist/css/style.css": "dev/less/style.less"
				}
			}
		}
	});

	grunt.registerTask('default', ['less', 'uglify', 'nodemon', 'watch']);
	grunt.registerTask('front', ['less', 'uglify', 'watch']);

	grunt.loadNpmTasks('grunt-nodemon');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-less');

};