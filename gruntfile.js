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
					baseUrl: 'dev/frontJs/',
					name: 'script',
					out: 'dist/js/build.min.js',
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
					'dev/css/main.css': ['dev/less/main.less', 'dev/less/preloader.less']
				}
			}
		},
		cssmin: {
			combine: {
				files: {
					'dist/css/style.min.css': ['dev/css/font-awesome.css', 'dev/css/normalize.css', 'dev/css/main.css']
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