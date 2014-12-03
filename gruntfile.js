module.exports = function(grunt) {
	
	grunt.initConfig({
		nodemon: {
			dev: {
				script: 'server.js'
			}
		},
		requirejs: {
			compile: {
				options: {
					baseUrl: "dev/frontJs/",
					name: 'script',
					out: "dist/js/build.min.js",
					include: ['tools/require.js']
				}
			}
		},
		watch: {
			scripts: {
				files: ['dev/frontJs/*.js'],
				tasks: ['requirejs'],
				options: {
					spawn: false,
				}
			},
			less: {
				files: ['dev/less/*.less'],
				tasks: ['less','cssmin']
			}
		},
		less: {
			development: {
				files: {
<<<<<<< HEAD
					'dist/js/built.min.js': ['dev/frontJs/jquery-1.11.1.min.js', 'dev/frontJs/jquery.ui.widget.js',
					'jquery.iframe-transport.js', 'dev/frontJs/jquery.fileupload.js', 'dev/frontJs/script.js', 'dev/frontJs/settingsPanel.js', 'dev/frontJs/pageDivider.js']
=======
					"dev/css/main.css": "dev/less/main.less"
>>>>>>> 83b877b21b36647d9f8ddfd1cfdd556b920cd609
				}
			}
		},
		cssmin: {
			combine: {
				files: {
					'dist/css/style.min.css': ['dev/css/normalize.css', 'dev/css/main.css']
				}
			}
		}
	});

	grunt.registerTask('default', ['less', 'cssmin', 'requirejs', 'nodemon', 'watch']);
	grunt.registerTask('front', ['less', 'cssmin', 'requirejs', 'watch']);

	grunt.loadNpmTasks('grunt-nodemon');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-requirejs');
	grunt.loadNpmTasks('grunt-contrib-cssmin');

};